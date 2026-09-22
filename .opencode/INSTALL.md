# Installing i484 Engineering for OpenCode

Add i484 Engineering to the `plugins` array in your global or project `opencode.json`:

```json
{
  "plugins": ["i484-engineering@git+https://github.com/ishibashi-c/i484-engineering.git"]
}
```

On OpenCode 1.x, the config key is `plugin` (singular):

```json
{
  "plugin": ["i484-engineering@git+https://github.com/ishibashi-c/i484-engineering.git"]
}
```

Restart OpenCode after changing the config. The plugin registers this repository's CE-derived and i484 specialist skills plus `/commands` directly; no Bun installer or generated skill copy is required. CE-derived skills keep names such as `ce-plan` and `ce-work`, while i484 specialist skills use the `i484-*` prefix.

To pin a release, add a tag. Replace `X.Y.Z` with the release you want from this repository's releases page:

```json
{
  "plugins": ["i484-engineering@git+https://github.com/ishibashi-c/i484-engineering.git#i484-engineering-vX.Y.Z"]
}
```

## Local Development

From this checkout, point OpenCode at the package path:

```json
{
  "plugins": ["/path/to/i484-engineering"]
}
```

Restart OpenCode after changing the package source. Opening this checkout as an OpenCode project also works without any config entry: OpenCode auto-discovers `.opencode/plugins/compound-engineering.js`.
