import {
    type Translate as BridgeTranslate,
    loadStrings,
    useLocale,
    useTranslation as useBridgeTranslation
} from "@photino-net-utils/bridge";
import type {LocalizationKey} from "./i18n.generated";

export {loadStrings, useLocale};

/** The bridge translator with its keys narrowed to the app's generated union. */
export type Translate = BridgeTranslate<LocalizationKey>;

/** Every key in this app, so a typo fails the TypeScript build instead of rendering the raw key. */
export const useTranslation = (): Translate => useBridgeTranslation<LocalizationKey>();
