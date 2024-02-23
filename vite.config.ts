import { unstable_vitePlugin as remix, AppConfig } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const remixConfig = {
  postcss: true,
} satisfies AppConfig;

export default defineConfig({
  plugins: [remix({ ...remixConfig, unstable_ssr: true }), tsconfigPaths()],
});
