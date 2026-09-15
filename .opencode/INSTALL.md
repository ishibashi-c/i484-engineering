# Installing i484 Engineering for OpenCode

Add i484 Engineering to the `plugin` array in your global or project `opencode.json`:

```json
{
  "plugin": ["i484-engineering@git+https://github.com/ishibashi-c/i484-engineering.git"]
}
```

Restart OpenCode after changing the config. The OpenCode plugin registers this repository's shared skills directory directly; no Bun installer or generated skill copy is required. CE-derived skills keep names such as `ce-plan` and `ce-work`, while i484 specialist skills use the `i484-*` prefix.

To pin a release, add a tag. Replace `X.Y.Z` with the release you want from this repository's releases page:

```json
{
  "plugin": ["i484-engineering@git+https://github.com/ishibashi-c/i484-engineering.git#i484-engineering-vX.Y.Z"]
}
```

## Local Development

From this checkout, point OpenCode at the package path:

```json
{
  "plugin": ["/path/to/i484-engineering"]
}
```

Restart OpenCode after changing the package source.
