// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript

interface ImportMetaEnv {
    readonly PUBLIC_TEST_PAGES_ENABLED: boolean;
    readonly PUBLIC_VIDEO_HOST_DOMAIN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}