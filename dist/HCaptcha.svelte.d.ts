import { SvelteComponentTyped } from "svelte";
declare global {
    interface Window {
        sitekey: string;
        hcaptchaOnLoad: Function;
        onSuccess: Function;
        onError: Function;
        onClose: Function;
        onExpired: Function;
        hcaptcha: any;
    }
}
export declare enum CaptchaTheme {
    DARK = "dark",
    LIGHT = "light"
}
declare const __propDef: {
    props: {
        sitekey: string;
        apihost?: string | undefined;
        hl?: string | undefined;
        reCaptchaCompat?: boolean | undefined;
        theme?: CaptchaTheme | undefined;
        size?: "normal" | "compact" | "invisible" | undefined;
        reset?: (() => void) | undefined;
        execute?: ((options: any) => any) | undefined;
    };
    events: {
        load: CustomEvent<any>;
        success: CustomEvent<any>;
        error: CustomEvent<any>;
        close: CustomEvent<any>;
        expired: CustomEvent<any>;
        mount: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type HCaptchaProps = typeof __propDef.props;
export declare type HCaptchaEvents = typeof __propDef.events;
export declare type HCaptchaSlots = typeof __propDef.slots;
export default class HCaptcha extends SvelteComponentTyped<HCaptchaProps, HCaptchaEvents, HCaptchaSlots> {
    get reset(): () => void;
    get execute(): (options: any) => any;
}
export {};
