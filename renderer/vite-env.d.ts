/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OUTPUT: string;
  readonly VITE_PRINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
