/// <reference types="@sveltejs/kit" />
import type { SvelteComponent } from "svelte";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}



export interface HCaptchaProps {
  sitekey?: string;
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