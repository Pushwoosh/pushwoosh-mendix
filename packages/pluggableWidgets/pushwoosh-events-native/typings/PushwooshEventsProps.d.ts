/**
 * This file was generated from PushwooshEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, EditableValue } from "mendix";
import { CSSProperties } from "react";

export interface PushwooshEventsProps<Style> {
    name: string;
    style: Style[];
    applicationCode: string;
    registerOnLoad: boolean;
    onInitializedAction?: ActionValue;
    onRegisteredAction?: ActionValue;
    pushTokenAttribute?: EditableValue<string>;
    payloadAttribute?: EditableValue<string>;
    messageAttribute?: EditableValue<string>;
    onPushReceivedAction?: ActionValue;
    onPushOpenedAction?: ActionValue;
    deepLinkAttribute?: EditableValue<string>;
    onDeepLinkAction?: ActionValue;
}

export interface PushwooshEventsPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    applicationCode: string;
    registerOnLoad: boolean;
    onInitializedAction: {} | null;
    onRegisteredAction: {} | null;
    pushTokenAttribute: string;
    payloadAttribute: string;
    messageAttribute: string;
    onPushReceivedAction: {} | null;
    onPushOpenedAction: {} | null;
    deepLinkAttribute: string;
    onDeepLinkAction: {} | null;
}
