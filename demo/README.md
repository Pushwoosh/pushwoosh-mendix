# Demo app

Empty on purpose — waiting on a Mendix account to be activated so Studio Pro can be
installed. This is the only piece of the module that cannot be written without it.

## What goes here

One Mendix app (`Pushwoosh.mpr`) that **builds for both platforms** from the same model.
It is not a sample on the side: it is how the module is developed, how a release is
verified on a real device, and what a customer is pointed at when they ask how to wire
this up.

Planned screens, one per feature group, the way the OutSystems `PushwooshDemo` is laid
out:

| Screen | Exercises |
| --- | --- |
| Home | The **Pushwoosh events** widget, Application Code, live event log |
| Registration | Register, Unregister, push token, HWID |
| User | Set/Get user ID, emails |
| Tags | Set tags, read them back |
| Events | Post an event with attributes |
| Badge | Set, read, add |
| Local notifications | Schedule, clear, clear centre |
| Privacy | The communication toggle |
| Support | GetDiagnostics, with a copy-to-clipboard button |

## Building it

```
demo/  →  Native Mobile Builder  →  ios/     → Xcode / xcodebuild
                                 →  android/ → Android Studio / gradlew
```

Local builds are the supported path; Mendix recommends them over cloud builds.

Two things to get right before the first build, both explained in
[`../llm/mendix-environment.md`](../llm/mendix-environment.md):

- the **push notifications** capability stays **off** and **Firebase Android** stays
  **on** — Pushwoosh replaces the built-in push rather than sitting next to it;
- the Make It Native app cannot contain this module. Generate a **Custom Developer App**.

## Also blocked on this

The Maestro E2E specs. They address elements on these screens, so writing them before the
screens exist would only produce placeholders.
