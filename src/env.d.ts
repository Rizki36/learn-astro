/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PROD: boolean;
	readonly DEV: boolean;
	readonly MODE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
