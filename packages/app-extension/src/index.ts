/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

import { defineIndexScript } from "@quasar/app-vite";

function extendConf(conf: any): any {
  const originalIsPreTag = conf.build?.viteVuePluginOptions?.template?.compilerOptions?.isPreTag;

  return {
    boot: ["~@quasar/quasar-app-extension-qmarkdown/src/boot/vite-register.ts"],

    css: ["~@quasar/quasar-ui-qmarkdown/src/index.scss"],

    framework: {
      plugins: ["Notify", "Dark"],
    },

    build: {
      viteVuePluginOptions: {
        template: {
          compilerOptions: {
            isPreTag: (tag: string) =>
              tag === "pre" ||
              tag === "q-markdown" ||
              tag === "QMarkdown" ||
              (typeof originalIsPreTag === "function" ? originalIsPreTag(tag) : false),
          },
        },
      },
    },
  };
}

export default defineIndexScript((api) => {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith("quasar", "^2.0.0");

  api.compatibleWith("@quasar/app-vite", ">=3.0.0-beta.27");

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi("QMarkdown", "~@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json");

  // We extend /quasar.config file
  api.extendQuasarConf(extendConf);

  if (api.prompts.import_md === true) {
    api.extendViteConf(() => {
      console.log(
        " App Extension (qmarkdown) Info: 'Adding markdown loader (*.md) to extendViteConf'",
      );

      return {
        plugins: [
          viteRawImporter({
            fileRegex: /\.md$/,
          }),
        ],
      };
    });
  }
});

const u2028re = /\u2028/g;
const u2029re = /\u2029/g;
function viteRawImporter({ fileRegex }: { fileRegex: RegExp }) {
  return {
    name: "vite-raw-importer",
    transform(code: string, id: string) {
      if (fileRegex.test(id)) {
        const json = JSON.stringify(code).replace(u2028re, "\\u2028").replace(u2029re, "\\u2029");

        return {
          code: `export default ${json}`,
        };
      }
    },
  };
}
