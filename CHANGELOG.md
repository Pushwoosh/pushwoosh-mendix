# Changelog

## 1.1.0

### Demo app

The repository now ships the Mendix app the module is developed against. It is a working
example, not a screenshot: open it in Studio Pro, put in your own Application Code, build
it for iOS or Android, and every action below is a button you can press on a device.

Screens cover registration and the push token, tags with the key and value typed in on the
device, events with the event name typed in, and unregistering.

The Application Code in the published copy is a placeholder — replace `XXXXX-XXXXX` with
yours from the Pushwoosh Control Panel before building.

### Notes

- The demo is not part of the Marketplace package. The `.mpk` contains the `Pushwoosh`
  module only; the demo lives here, in the repository.
- Building it needs Studio Pro 11.11+ and, for the native app, Xcode or Android Studio.
  The Mac build of Studio Pro has no Native Mobile Builder, so on macOS the native project
  is configured through Mendix's `native-mobile-toolkit` CLI instead.

## 1.0.1

Documentation only — the module itself is unchanged from 1.0.0.

- A README written for the person installing the module, rather than for the people
  building it: what the widget does, what each of the 23 actions returns, how to
  configure the native build, and what to check when nothing happens.
- Corrected the minimum Studio Pro version. 1.0.0 said 11.13; the real floor is **11.11**,
  because native-template 19.1 already carries the React Native version this module needs.

## 1.0.0

First release of the Pushwoosh module for Mendix.

**Requires Studio Pro 11.11 or newer** (native-template 19.1 or 20, React Native 0.84).

### Getting started

Drop the **Pushwoosh events** widget on your home page and fill in your Application Code
from the Pushwoosh Control Panel. That one step initializes the SDK, registers the device
and gives you nanoflow events for arriving and opened notifications.

### JavaScript actions

- **Setup** — Initialize
- **Registration** — RegisterForPushNotifications, UnregisterForPushNotifications,
  GetPushToken, GetHwid
- **User** — SetUserId, GetUserId, SetEmails
- **Tags** — SetTags, GetTags
- **Events** — PostEvent
- **Local notifications** — ScheduleLocalNotification, ClearLocalNotifications,
  ClearNotificationCenter
- **Privacy** — IsCommunicationEnabled, SetCommunicationEnabled
- **Settings** — SetLanguage, SetReverseProxy, SetShowForegroundAlert,
  GetShowForegroundAlert
- **Other channels** — RegisterSmsNumber, RegisterWhatsappNumber
- **Support** — GetDiagnostics, which collects the state of the integration into one JSON
  to attach to a support ticket

### The Pushwoosh events widget

Raises On initialized, On registered, On push received, On push opened and On deep link,
and writes the payload, the message text, the push token and the deep link into attributes
you choose.

### Notes

- Pushwoosh replaces the built-in push of a Mendix app rather than sitting beside it.
  Leave the **push notifications** capability off in the Native Mobile Builder and keep
  **Firebase Android** on, so `google-services.json` is still picked up. Two notification
  services registered for the same Firebase event shadow each other and pushes stop
  arriving.
- The Make It Native app cannot contain this module. Build a Custom Developer App to test
  on a device.
- Native SDKs come from `pushwoosh-react-native-plugin` 6.1.59, installed by Mendix during
  the native build.
