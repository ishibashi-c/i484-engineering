# Installing i484 Engineering for Cline

Cline loads i484 Engineering through native **skills** discovery — the same `SKILL.md` directories shipped in this repository's `skills/` folder. No Bun converter or generated copy step is required.

The engineering baseline remains Compound Engineering, so CE-derived skills retain names such as `ce-brainstorm` and `ce-plan`; the distribution itself is i484 Engineering and also includes the `i484-*` specialist skills.

## Extension (VS Code, Cursor, JetBrains)

1. Install the [Cline extension](https://docs.cline.bot/getting-started/installing-cline) in your editor.
2. Enable **Settings -> Features -> Enable Skills**.
3. Link i484 Engineering skills globally or into your project (see below).
4. Start a new Cline task. Skills appear when their descriptions match your request.

## Install skills

From a clone of this repository:

```bash
# Global (~/.cline/skills/) — available in every project
./i484-engineering/.cline/scripts/install-skills.sh --global

# Project (.cline/skills/ in the current directory)
./i484-engineering/.cline/scripts/install-skills.sh --project
```

The script creates symlinks so Cline reads the live skill directories from your checkout. Re-run it after `git pull` to refresh links when skill folder names change. It only creates or replaces links whose target resolves under this checkout's `skills/` tree; an existing `~/.cline/skills/<name>` pointing at your own skill or another checkout is left untouched. Default installs also remove only manual-only symlinks owned by this checkout.

Skills marked `disable-model-invocation: true` (for example `ce-dogfood`, `ce-polish`, `ce-setup`) are **not** linked by default — Cline auto-activates from description matching and has no manual-only gate, so linking them would let them fire unintentionally. Those commands are unavailable until you opt in:

```bash
./i484-engineering/.cline/scripts/install-skills.sh --global --include-manual
```

`--include-manual` links manual-only skills so `/ce-polish` and similar commands work, with a warning that Cline may still auto-activate them when descriptions match. Omit the flag if you do not need those workflows on Cline.

## Pin a release

Clone the i484 Engineering release you want, then run the install script against that checkout:

```bash
git clone --branch i484-engineering-vX.Y.Z --depth 1 \
  https://github.com/ishibashi-c/i484-engineering.git
./i484-engineering/.cline/scripts/install-skills.sh --global
```

Replace `X.Y.Z` with a tag from this repository's releases page.

## Local development

From your working copy:

```bash
/path/to/i484-engineering/.cline/scripts/install-skills.sh --global
```

Edit skills under `skills/` and start a new Cline task to pick up prose changes.

## Uninstall

Remove i484 Engineering skill symlinks from `~/.cline/skills/` or `.cline/skills/`. Skill directory names match the folders under `skills/` (for example `ce-brainstorm`, `ce-plan`, and `i484-product-design`).

## Cline CLI

The Cline CLI supports separate `AgentPlugin` installs for custom tools and hooks. i484 Engineering does not require a CLI plugin for its skills to work. Use the skills install script above when running Cline from the terminal.
