<script context="module">export var CaptchaTheme;
(function (CaptchaTheme) {
    CaptchaTheme["DARK"] = "dark";
    CaptchaTheme["LIGHT"] = "light";
})(CaptchaTheme || (CaptchaTheme = {}));
//
</script>
  
  <script>import { onDestroy, createEventDispatcher, onMount } from 'svelte';
// @ts-ignore
const browser = import.meta.env.SSR === undefined ? true : !import.meta.env.SSR;
const dispatch = createEventDispatcher();
export let sitekey;
export let apihost = 'https://js.hcaptcha.com/1/api.js';
export let hl = '';
export let reCaptchaCompat = false;
export let theme = CaptchaTheme.LIGHT;
export let size = 'normal';
export const reset = () => {
    if (mounted && loaded && widgetID)
        hcaptcha.reset(widgetID);
};
export const execute = (options) => {
    if (mounted && loaded && widgetID)
        return hcaptcha.execute(widgetID, options);
};
// ensure that all captcha divs on a page are uniquely identifiable
const id = Math.floor(Math.random() * 100);
let mounted = false;
let loaded = false;
let widgetID;
// construct the script tag for hCaptcha remote resources
const query = new URLSearchParams({
    recaptchacompat: reCaptchaCompat ? 'on' : 'off',
    onload: 'hcaptchaOnLoad',
    render: 'explicit',
});
const scriptSrc = `${apihost}?${query.toString()}`;
onMount(() => {
    if (browser && !sitekey)
        sitekey = window.sitekey;
    if (browser) {
        window.hcaptchaOnLoad = () => {
            // consumers can attach custom on:load handlers
            dispatch('load');
            loaded = true;
        };
        window.onSuccess = (token) => {
            dispatch('success', {
                token: token,
            });
        };
        window.onError = () => {
            dispatch('error');
        };
        window.onClose = () => {
            dispatch('close');
        };
        window.onExpired = () => {
            dispatch('expired');
        };
    }
    dispatch('mount');
    mounted = true;
});
onDestroy(() => {
    if (browser) {
        //@ts-ignore
        window.hcaptchaOnLoad = null;
        //@ts-ignore
        window.onSuccess = null;
    }
    // guard against script loading race conditions
    // i.e. if component is destroyed before hcaptcha reference is loaded
    if (loaded)
        hcaptcha = null;
});
$: if (mounted && loaded) {
    widgetID = hcaptcha.render(`h-captcha-${id}`, {
        sitekey,
        hl,
        theme,
        callback: 'onSuccess',
        'error-callback': 'onError',
        'close-callback': 'onClose',
        'expired-callback': 'onExpired',
        size,
    });
}
</script>
  
  <svelte:head>
    {#if mounted && !window?.hcaptcha}
      <script src={scriptSrc} async defer></script>
    {/if}
  </svelte:head>
  
  <div id="h-captcha-{id}" />