import type { SvelteComponent } from "svelte";

export interface HCaptchaProps {
    sitekey: string;
    apihost?: string;
    hl?: string;
    reCaptchaCompat?: boolean;
    theme?: 'dark'|'light';
    size?: string;
  }
  
  declare class HCaptcha extends SvelteComponent {
    $$prop_def: HCaptchaProps;
  }
  
  export default HCaptcha;