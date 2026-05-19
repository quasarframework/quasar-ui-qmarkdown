// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from "@quasar/app-vite";
import { viteExamplesPlugin, viteManualChunks } from "@md-plugins/vite-examples-plugin";
import { viteMdPlugin, type MenuItem } from "@md-plugins/vite-md-plugin";

export default defineConfig(async (ctx) => {
  const siteConfig = await import("./src/siteConfig");
  const { sidebar } = siteConfig.default;

  return {
    boot: [],

    css: ["app.scss"],

    extras: ["fontawesome-v6", "roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20",
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: "history",

      extendViteConf(viteConf, { isClient }) {
        const alias = viteConf.resolve?.alias;
        viteConf.resolve = viteConf.resolve || {};
        viteConf.resolve.alias = [
          ...(Array.isArray(alias)
            ? alias
            : Object.entries(alias ?? {}).map(([find, replacement]) => ({ find, replacement }))),
          // Consume workspace source in docs so examples track local UI edits.
          {
            find: /^@quasar\/quasar-ui-qmarkdown$/,
            replacement: ctx.appPaths.appDir + "/../ui/src/index.js",
          },
          // Rolldown is stricter than Rollup for generated Quasar source deep imports.
          {
            find: /^quasar\/src\/(.*)$/,
            replacement: ctx.appPaths.appDir + "/node_modules/quasar/src/$1",
          },
        ];

        if (ctx.prod && isClient) {
          viteConf.build = viteConf.build || {};
          viteConf.build.chunkSizeWarningLimit = 650;
          viteConf.build.rollupOptions = {
            output: { manualChunks: viteManualChunks },
          };
        }
      },

      vitePlugins: [
        [
          viteMdPlugin,
          {
            path: ctx.appPaths.srcDir + "/markdown",
            menu: sidebar as MenuItem[],
            config: {
              headersPlugin: {
                shouldAllowExample: false,
              },
            },
          },
        ],
        [
          viteExamplesPlugin,
          {
            isProd: ctx.prod,
            path: ctx.appPaths.srcDir + "/examples",
          },
        ],
        [
          "vite-plugin-checker",
          {
            vueTsc: true,
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
      port: 8090,
    },

    framework: {
      config: {
        dark: "auto",
        loadingBar: {
          color: "red",
          position: "top",
        },
      },

      plugins: [
        "Dark",
        "Dialog",
        "LoadingBar",
        "LocalStorage",
        "Meta",
        "Notify",
        "Platform",
        "Screen",
      ],
    },

    animations: [],
  };
});
