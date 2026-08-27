# Changelog

## 1.0.0

First release of the Pushwoosh module for Mendix.

**Requires Studio Pro 11.13 or newer** (native-template 20, React Native 0.84).

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
