<p align="center">
  <a href="https://docs.pushwoosh.com/">
    <img src="pushwoosh.png" alt="Pushwoosh" width="100%">
  </a>
</p>

<h1 align="center">Pushwoosh Mendix Module</h1>

<p align="center">
  <a href="https://github.com/Pushwoosh/pushwoosh-mendix/releases"><img src="https://img.shields.io/github/release/Pushwoosh/pushwoosh-mendix.svg?style=flat-square" alt="GitHub release"></a>
  <a href="https://github.com/Pushwoosh/pushwoosh-mendix/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
</p>

<p align="center">
  Push notifications, in-app messaging and customer engagement for Mendix native mobile apps.
</p>

<p align="center">
  Built on <a href="https://github.com/Pushwoosh/pushwoosh-react-native-plugin">Pushwoosh React Native Plugin</a> 6.1.59.
</p>

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [The Pushwoosh events widget](#the-pushwoosh-events-widget)
- [JavaScript actions](#javascript-actions)
- [Native build configuration](#native-build-configuration)
- [Troubleshooting](#troubleshooting)
- [Building from source](#building-from-source)
- [Support](#support)
- [License](#license)

## Requirements

| | |
| --- | --- |
| Studio Pro | 11.12.3 or newer |
| Platforms | iOS and Android, native mobile profile |
| Pushwoosh account | free tier is enough to start — [sign up](https://app.pushwoosh.com/signup) |

## Installation

Download **Pushwoosh** from the Mendix Marketplace, inside Studio Pro: the Marketplace
icon in the top right, search for *Pushwoosh*, then **Download**. The module appears in
your app as `Pushwoosh`.

Nothing else to install: the native SDKs come from npm during the native build, pinned to
the exact version this module was tested with.

## Quick Start

One widget is enough to get push notifications working.

1. Open the home page of your **native mobile** navigation profile.
2. Drop the **Pushwoosh events** widget on it.
3. Set **Application Code** to your code from the Pushwoosh Control Panel
   (looks like `XXXXX-XXXXX`).
4. Build and run the app on a device.

That single step starts the SDK, registers the device and gives you nanoflow events for
arriving and opened notifications. Everything below is optional on top of it.

## The Pushwoosh events widget

The widget is invisible — place it once, on the page that loads first.

**Setup**

| Property | What it does |
| --- | --- |
| Application Code | Your Pushwoosh Application Code. Required. |
| Register on load | Registers the device as soon as the widget loads. On iOS this shows the system permission prompt, so turn it off if you would rather ask later with the *Register* action. |
| On initialized | Nanoflow, runs once the SDK has started. |
| On registered | Nanoflow, runs when the device has a push token. |
| Push token | The attribute the token is written to before *On registered* runs. |

**Push events**

| Property | What it does |
| --- | --- |
| Payload | Attribute receiving the full push payload as JSON. |
| Message | Attribute receiving the notification text. |
| On push received | Nanoflow, runs when a push arrives while the app is open. |
| On push opened | Nanoflow, runs when the user taps a notification. |

**Deep links**

| Property | What it does |
| --- | --- |
| Deep link | Attribute receiving the deep link URL from the push. |
| On deep link | Nanoflow, runs when an opened push carries a link. Runs in addition to *On push opened*. |

The attributes are filled **before** the nanoflow runs, so the nanoflow can read them
straight away.

## JavaScript actions

Twenty-three actions, all available in nanoflows on the native mobile profile.

**Setup**

| Action | Returns |
| --- | --- |
| `Initialize` | Boolean — starts the SDK. Only needed if you are not using the widget. |

**Registration**

| Action | Returns |
| --- | --- |
| `RegisterForPushNotifications` | String — the push token. Shows the permission prompt on iOS. |
| `UnregisterForPushNotifications` | String — stops delivery to this device. |
| `GetPushToken` | String — empty until the device is registered. |
| `GetHwid` | String — the Pushwoosh device ID, for targeting a single device. |

**User identity**

| Action | Returns |
| --- | --- |
| `SetUserId` | Boolean — associates the device with your own user identifier. |
| `GetUserId` | String |
| `SetEmails` | Boolean — one address, or several separated by commas. |

**Tags**

| Action | Returns |
| --- | --- |
| `SetTags` | Boolean — takes a JSON object, e.g. `{"Language":"en","Level":7}`. |
| `GetTags` | String — the device's tags as JSON. |

**Events**

| Action | Returns |
| --- | --- |
| `PostEvent` | Boolean — event name plus optional JSON attributes. Drives triggered campaigns. |

**Local notifications**

| Action | Returns |
| --- | --- |
| `ScheduleLocalNotification` | Boolean — message, delay in seconds, optional JSON payload. |
| `ClearLocalNotifications` | Boolean — cancels what has not fired yet. |
| `ClearNotificationCenter` | Boolean — clears already delivered notifications. |

**Privacy**

| Action | Returns |
| --- | --- |
| `IsCommunicationEnabled` | Boolean — current consent state. |
| `SetCommunicationEnabled` | Boolean — wire this to a "do not contact me" toggle. |

**Settings**

| Action | Returns |
| --- | --- |
| `SetLanguage` | Boolean — overrides the device language for message localisation. |
| `SetReverseProxy` | Boolean — routes traffic through your own endpoint. Call it before `Initialize`. |
| `SetShowForegroundAlert` | Boolean — whether a push arriving while the app is open is shown by the system. |
| `GetShowForegroundAlert` | Boolean |

**Other channels**

| Action | Returns |
| --- | --- |
| `RegisterSmsNumber` | Boolean |
| `RegisterWhatsappNumber` | Boolean |

**Support**

| Action | Returns |
| --- | --- |
| `GetDiagnostics` | String — the state of the integration as JSON. Attach it to a support ticket instead of describing symptoms. |

## Native build configuration

**Pushwoosh replaces the built-in push of a Mendix app — it does not sit beside it.**

In the Native Mobile Builder:

- leave **Push notifications** **off**,
- keep **Firebase Android** **on**, so `google-services.json` is still picked up.

Two notification services registered for the same Firebase event shadow each other and
pushes stop arriving. On Android the FCM Sender ID comes from `google-services.json`; it
is not passed to the module.

On iOS, enable the **Push Notifications** capability and upload your APNs key to the
Pushwoosh Control Panel as usual.

## Troubleshooting

**Nothing happens, no errors.** The Make It Native app cannot contain this module —
third-party native code is not in it. Build a **Custom Developer App** or a real native
build.

**`GetDiagnostics` says the native module is missing.** Same cause as above.

**Pushes stop arriving on Android after enabling something else.** Check that only one
notification service is registered for `com.google.firebase.MESSAGING_EVENT`.

For anything else, run `GetDiagnostics` and attach its output to a support ticket — it
carries the platform, the SDK state, the device identifiers and the current settings.

## Building from source

```bash
npm install
npm run build
```

Requires Node 22.18 or newer within the 22.x range — the Mendix widget tooling enforces
it. Output lands in `packages/*/*/dist`.

## Support

- [Pushwoosh Documentation](https://docs.pushwoosh.com/)
- [Support Portal](https://support.pushwoosh.com/)
- [Issues](https://github.com/Pushwoosh/pushwoosh-mendix/issues)

## License

Pushwoosh Mendix Module is available under the MIT license. See [LICENSE](LICENSE.md) for
details.

---

Made with ❤️ by [Pushwoosh](https://www.pushwoosh.com/)
