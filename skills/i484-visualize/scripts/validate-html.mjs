#!/usr/bin/env node

import { readFile } from "node:fs/promises";

const TAG_PATTERN = /<([a-z][\w:-]*)(?:\s+([^<>]*?))?\s*\/?>/gi;

function attribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\[\]\\]/g, "\\$&");
  const pattern = new RegExp("(?:^|\\s)" + escapedName + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s\"'=<>`]+))", "i");
  const match = tag.match(pattern);
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}

function textContent(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function issue(source, code, message, index = 0) {
  return { code, message, line: lineNumber(source, index) };
}

function portableReference(value) {
  const reference = value.trim().toLowerCase();
  return reference === "" || reference.startsWith("data:") || reference.startsWith("#") || reference === "about:blank";
}

function cssReferences(source, css, offset) {
  const issues = [];
  const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, " ");
  const importRanges = [];
  const importPattern = /@import\s+(?:url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)|"([^"]*)"|'([^']*)')/gi;
  let match;
  while ((match = importPattern.exec(cleanCss))) {
    const value = (match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? "").trim();
    importRanges.push([match.index, importPattern.lastIndex]);
    if (!portableReference(value)) {
      issues.push(issue(source, "external-css-import", `CSS @import is a display dependency: ${value}`, offset + match.index));
    }
  }
  const urlPattern = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi;
  while ((match = urlPattern.exec(cleanCss))) {
    if (importRanges.some(([start, end]) => match.index >= start && match.index < end)) continue;
    const value = (match[1] ?? match[2] ?? match[3] ?? "").trim();
    if (!portableReference(value)) {
      issues.push(issue(source, "external-css-url", `CSS url() is a display dependency: ${value}`, offset + match.index));
    }
  }
  return issues;
}

function splitReferences(value) {
  const segments = [];
  let segment = "";
  for (const character of value) {
    const trimmed = segment.trim().toLowerCase();
    const commaBelongsToDataUrl = trimmed.startsWith("data:") && !/\s/.test(trimmed.slice(5));
    if (character === "," && !commaBelongsToDataUrl) {
      if (segment.trim()) segments.push(segment.trim());
      segment = "";
    } else {
      segment += character;
    }
  }
  if (segment.trim()) segments.push(segment.trim());
  return segments.map((part) => part.split(/\s+/)[0]).filter(Boolean);
}

function referencedText(source, ids) {
  return ids.every((id) => {
    const pattern = new RegExp(`<(?:[a-z][\\w:-]*)\\b[^>]*\\bid\\s*=\\s*(?:"${id.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}"|'${id.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}')[^>]*>([\\s\\S]*?)<\\/`, "i");
    const match = source.match(pattern);
    return Boolean(match && textContent(match[1]));
  });
}

function validateSvg(source, openTag, inner, index) {
  const role = (attribute(openTag, "role") ?? "").toLowerCase();
  const ariaHidden = (attribute(openTag, "aria-hidden") ?? "").toLowerCase() === "true";
  const decorative = ariaHidden || role === "presentation" || role === "none";
  if (decorative) return [];

  const labels = attribute(openTag, "aria-labelledby");
  const describedBy = attribute(openTag, "aria-describedby");
  const titleMatch = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(inner);
  const descMatch = /<desc\b[^>]*>([\s\S]*?)<\/desc>/i.exec(inner);
  const hasName = Boolean(textContent(attribute(openTag, "aria-label") ?? "")) || Boolean(titleMatch && textContent(titleMatch[1])) || Boolean(labels && referencedText(source, labels.split(/\s+/).filter(Boolean)));
  const hasExplicitDescription = Boolean(descMatch) || describedBy !== null;
  const hasDescription = Boolean(descMatch && textContent(descMatch[1])) || Boolean(describedBy && referencedText(source, describedBy.split(/\s+/).filter(Boolean)));
  const issues = [];
  if (!hasName) issues.push(issue(source, "svg-name", "Informative SVG needs a short accessible name (aria-label, aria-labelledby, or <title>).", index));
  if (hasExplicitDescription && !hasDescription) issues.push(issue(source, "svg-description", "Explicit SVG description must be non-empty and reference available content (<desc> or aria-describedby).", index));
  return issues;
}

export function validateHtml(source) {
  const issues = [];
  const doctype = /^\uFEFF?\s*<!doctype\s+html\s*>/i.exec(source);
  if (!doctype) issues.push(issue(source, "doctype", "Document must start with <!doctype html>.", 0));

  const htmlMatch = /<html\b[^>]*>/i.exec(source);
  if (!htmlMatch || !textContent(attribute(htmlMatch[0], "lang") ?? "")) {
    issues.push(issue(source, "html-lang", "<html> must have a non-empty lang attribute.", htmlMatch?.index ?? 0));
  }

  const headMatch = /<head\b[^>]*>/i.exec(source);
  const headEnd = headMatch ? source.indexOf("</head>", headMatch.index) : -1;
  const head = headMatch ? source.slice(headMatch.index, headEnd >= 0 ? headEnd + 7 : source.length) : "";
  if (!headMatch) {
    issues.push(issue(source, "head", "Document must contain a <head> element.", 0));
  } else {
    const metas = [...head.matchAll(/<meta\b[^>]*>/gi)];
    const charset = metas.find((meta) => (attribute(meta[0], "charset") ?? "").trim().toLowerCase() === "utf-8");
    if (!charset || Buffer.byteLength(head.slice(0, charset.index), "utf8") >= 1024) {
      issues.push(issue(source, "charset", "UTF-8 charset metadata must occur within the first 1024 bytes of <head>.", headMatch.index));
    }
    const titleMatch = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(head);
    if (!titleMatch || !textContent(titleMatch[1])) {
      issues.push(issue(source, "title", "Document must have a meaningful non-empty <title>.", headMatch.index));
    }
    const viewport = metas.some((meta) => (attribute(meta[0], "name") ?? "").trim().toLowerCase() === "viewport" && textContent(attribute(meta[0], "content") ?? ""));
    if (!viewport) issues.push(issue(source, "viewport", "Document must contain viewport metadata.", headMatch.index));
  }

  const ids = new Map();
  const tags = [];
  let tagMatch;
  while ((tagMatch = TAG_PATTERN.exec(source))) {
    const fullTag = tagMatch[0];
    if (fullTag.startsWith("<!--") || fullTag.startsWith("<!")) continue;
    const name = tagMatch[1].toLowerCase();
    const attrs = tagMatch[2] ?? "";
    tags.push({ name, fullTag, attrs, index: tagMatch.index });
    const id = attribute(attrs, "id");
    if (id?.trim()) {
      const value = id.trim();
      if (ids.has(value)) issues.push(issue(source, "duplicate-id", `Duplicate id: ${value}`, tagMatch.index));
      else ids.set(value, tagMatch.index);
    }
  }

  for (const tag of tags) {
    const valueChecks = [];
    if (tag.name === "link" && /(?:^|\s)stylesheet(?:\s|$)/i.test(attribute(tag.attrs, "rel") ?? "")) valueChecks.push(["href", "external-stylesheet"]);
    if (tag.name === "script" || tag.name === "img" || tag.name === "iframe") valueChecks.push(["src", `external-${tag.name}`]);
    if (tag.name === "source") valueChecks.push(["src", "external-image"]);
    if (["audio", "video", "track", "embed"].includes(tag.name)) valueChecks.push(["src", `external-${tag.name}`]);
    if (tag.name === "video") valueChecks.push(["poster", "external-poster"]);
    if (tag.name === "object") valueChecks.push(["data", "external-object"]);
    if (["image", "use"].includes(tag.name)) valueChecks.push(["href", "external-svg"], ["xlink:href", "external-svg"]);
    for (const [name, code] of valueChecks) {
      const value = attribute(tag.attrs, name);
      if (value && !portableReference(value)) issues.push(issue(source, code, `${tag.name} ${name} is a display dependency: ${value}`, tag.index));
    }
    if ((tag.name === "img" || tag.name === "source") && attribute(tag.attrs, "srcset")) {
      for (const value of splitReferences(attribute(tag.attrs, "srcset"))) if (!portableReference(value)) issues.push(issue(source, "external-image", `${tag.name} srcset is a display dependency: ${value}`, tag.index));
    }
    const inlineStyle = attribute(tag.attrs, "style");
    if (inlineStyle) issues.push(...cssReferences(source, inlineStyle, tag.index));
  }

  const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let styleMatch;
  while ((styleMatch = stylePattern.exec(source))) issues.push(...cssReferences(source, styleMatch[1], styleMatch.index));

  const svgPattern = /<svg\b([^>]*)>([\s\S]*?)<\/svg>/gi;
  let svgMatch;
  while ((svgMatch = svgPattern.exec(source))) issues.push(...validateSvg(source, svgMatch[0].slice(0, svgMatch[0].indexOf(">") + 1), svgMatch[2], svgMatch.index));
  return issues;
}

async function main() {
  const file = process.argv[2];
  if (!file || process.argv.includes("--help")) {
    console.error("Usage: node scripts/validate-html.mjs <artifact.html>");
    process.exit(file ? 0 : 2);
  }
  let source;
  try {
    source = await readFile(file, "utf8");
  } catch (error) {
    console.error(`${file}: unable to read HTML (${error.message})`);
    process.exitCode = 1;
    return;
  }
  const issues = validateHtml(source);
  if (issues.length === 0) {
    console.log(`PASS ${file}`);
    return;
  }
  for (const item of issues) console.error(`${file}:${item.line} ${item.code}: ${item.message}`);
  process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
