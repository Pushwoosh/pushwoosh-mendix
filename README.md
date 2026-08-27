# pushwoosh-mendix

The Pushwoosh module for [Mendix](https://www.mendix.com) — push notifications,
in-app messages and customer engagement for Mendix Native Mobile apps.

Mendix Native Mobile is React Native under the hood, so this module is a thin
Mendix-shaped layer over the existing
[`pushwoosh-react-native-plugin`](https://github.com/Pushwoosh/pushwoosh-react-native-plugin):
JavaScript actions a Mendix developer calls from nanoflows, a native widget that
raises push events, and the packaging that turns both into a Marketplace listing.

**No native code lives here.** It comes from npm, pinned to an exact version, and
Mendix links it during the native build. New native SDKs reach Mendix apps by
bumping one number.

> **AI agents:** start with [`llm/README.md`](llm/README.md). It maps the
> architecture, the Mendix environment, and the native compatibility status.

## Layout

```
packages/jsActions/pushwoosh-native/   JavaScript actions (TypeScript)
packages/pluggableWidgets/             the widget that raises push events
configs/jsactions/                     rollup config, from mendix/native-widgets
scripts/                               build, verify, release
test-project/                          the Mendix app used to develop and test
llm/                                   documentation for whoever picks this up next
```

## Requirements

| | |
| --- | --- |
| Studio Pro | 11.11+ (native-template 19.1 or 20 — both React Native 0.84) |
| Node | 22.18.x – 22.x |
| Package manager | npm (workspaces) |
| Mendix account | `sdk@pushwoosh.com` |

## Status

Early. What is verified so far is written down in
[`llm/native-compatibility.md`](llm/native-compatibility.md) — read it before
promising a date to anyone.

## Attribution

`configs/jsactions/` and parts of `scripts/` are taken from
[`mendix/native-widgets`](https://github.com/mendix/native-widgets) (Apache-2.0),
Mendix's own monorepo for native modules. Using their build chain unchanged means
their tooling keeps working here.
