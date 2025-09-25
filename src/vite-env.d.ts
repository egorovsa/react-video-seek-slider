/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_AUTH_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
