/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OUTPUT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
