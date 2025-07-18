/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_MATRIX_SERVER_OPTIONS: string;
	readonly VITE_MATRIX_DEFAULT_SERVER: string;
	readonly VITE_SSO_URL_REDIRECT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
