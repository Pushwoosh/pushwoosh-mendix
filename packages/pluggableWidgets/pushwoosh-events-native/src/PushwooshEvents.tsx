import { Component } from "react";
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { ActionValue, EditableValue } from "mendix";
import Pushwoosh from "pushwoosh-react-native-plugin";

import { PushwooshEventsProps } from "../typings/PushwooshEventsProps";

export type Props = PushwooshEventsProps<undefined>;

/**
 * Mendix hands actions over as ActionValue. Running one means checking it is
 * allowed to run first; Mendix's own widgets use an `executeAction` helper from an
 * internal package that is not published to npm, so this is the same three lines.
 */
function executeAction(action?: ActionValue): void {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
}

/** Writes to an attribute only when the widget was actually given one and it is writable. */
function setAttribute(attribute: EditableValue<string> | undefined, value: string): void {
    if (attribute && attribute.status === "available" && !attribute.readOnly) {
        attribute.setValue(value);
    }
}

/**
 * Pulls the human-readable text out of a push payload. iOS delivers the APNs
 * dictionary (`aps.alert`, either a string or a title/body object), Android delivers
 * the Pushwoosh payload with `title` and `message`.
 */
function messageFromPayload(payload: Record<string, any>): string {
    const alert = payload?.aps?.alert;
    if (typeof alert === "string") {
        return alert;
    }
    if (alert && typeof alert === "object") {
        return [alert.title, alert.body].filter(Boolean).join(" — ");
    }
    return payload?.message ?? payload?.title ?? "";
}

/** Pushwoosh carries the deep link in the `l` field of the payload. */
function deepLinkFromPayload(payload: Record<string, any>): string {
    const link = payload?.l;
    return typeof link === "string" ? link : "";
}

export class PushwooshEvents extends Component<Props> {
    private subscriptions: EmitterSubscription[] = [];

    componentDidMount(): void {
        this.subscriptions = [
            DeviceEventEmitter.addListener("pushReceived", (payload: Record<string, any>) =>
                this.onPush(payload, this.props.onPushReceivedAction, false)
            ),
            DeviceEventEmitter.addListener("pushOpened", (payload: Record<string, any>) =>
                this.onPush(payload, this.props.onPushOpenedAction, true)
            )
        ];

        if (!this.props.applicationCode) {
            return;
        }

        Pushwoosh.init(
            { pw_appid: this.props.applicationCode },
            () => {
                executeAction(this.props.onInitializedAction);

                if (this.props.registerOnLoad) {
                    Pushwoosh.register(
                        (token: string) => {
                            setAttribute(this.props.pushTokenAttribute, token ?? "");
                            executeAction(this.props.onRegisteredAction);
                        },
                        () => {
                            // Registration failing is normal — the user can decline the
                            // permission prompt. The app carries on without a token.
                        }
                    );
                }
            },
            () => {
                // init reports failure without a reason; nothing useful to hand the app.
            }
        );
    }

    componentWillUnmount(): void {
        this.subscriptions.forEach(subscription => subscription.remove());
        this.subscriptions = [];
    }

    render(): null {
        return null;
    }

    private onPush(payload: Record<string, any>, action: ActionValue | undefined, opened: boolean): void {
        const safePayload = payload ?? {};

        setAttribute(this.props.payloadAttribute, JSON.stringify(safePayload));
        setAttribute(this.props.messageAttribute, messageFromPayload(safePayload));

        executeAction(action);

        if (!opened) {
            return;
        }

        const deepLink = deepLinkFromPayload(safePayload);
        if (deepLink) {
            setAttribute(this.props.deepLinkAttribute, deepLink);
            executeAction(this.props.onDeepLinkAction);
        }
    }
}
