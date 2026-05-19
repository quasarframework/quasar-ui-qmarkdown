/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

import { defineIndexScript } from "@quasar/app-vite";
import { extend } from "quasar";

function extendConf(conf) {
  conf.boot = conf.boot || [];
  conf.css = conf.css || [];
  conf.build = conf.build || {};
  conf.framework = conf.framework || {};
  conf.framework.plugins = conf.framework.plugins || [];

  // register our boot file
  conf.boot.push("~@quasar/quasar-app-extension-qmarkdown/src/boot/vite-register.js");

  // make sure these plugins are in the build
  conf.framework.plugins.push("Notify");
  conf.framework.plugins.push("Dark");

  conf.build = extend(
    true,
    {
      viteVuePluginOptions: {
        template: {
          compilerOptions: {
            isPreTag: (tag) => tag === "pre" || tag === "q-markdown" || tag === "QMarkdown",
          },
        },
      },
    },
    conf.build,
  );

  // This needs to be set for Vue 3
  const compilerOptions = conf.build.viteVuePluginOptions.template.compilerOptions;
  const oldPreTagFunc = compilerOptions.isPreTag;
  compilerOptions.isPreTag = (tag) =>
    tag === "pre" ||
    tag === "q-markdown" ||
    tag === "QMarkdown" ||
    (typeof oldPreTagFunc === "function" ? oldPreTagFunc(tag) : false);

  // make sure the stylesheet is processed through the Quasar app pipeline
  conf.css.push("~@quasar/quasar-ui-qmarkdown/src/index.scss");
}

export default defineIndexScript((api) => {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith("quasar", "^2.0.0");

  api.compatibleWith("@quasar/app-vite", ">=3.0.0-beta.17");

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi("QMarkdown", "~@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json");

  // We extend /quasar.config file
  api.extendQuasarConf(extendConf);

  if (api.prompts.import_md !== undefined && api.prompts.import_md === true) {
    api.extendViteConf((viteConf) => {
      console.log(
        " App Extension (qmarkdown) Info: 'Adding markdown loader (*.md) to extendViteConf'",
      );

      viteConf.plugins ||= [];
      viteConf.plugins.push(
        viteRawImporter({
          fileRegex: /\.md$/,
        }),
      );
    });
  }
});

function viteRawImporter(options) {
  return {
    name: "vite-raw-importer",
    transform(code, id) {
      if (options.fileRegex && options.fileRegex.test(id)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, "\\u2028")
          .replace(/\u2029/g, "\\u2029");

        return {
          code: `export default ${json}`,
        };
      }
    },
  };
}
