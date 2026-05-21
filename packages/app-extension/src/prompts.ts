/**
 * Quasar App Extension prompts script
 * https://quasar.dev/app-extensions/development-guide/prompts-api
 */

import { definePromptsScript } from "@quasar/app-vite";
import { cancel, confirm, group, intro, outro } from "@clack/prompts";

export default definePromptsScript(async () => {
  intro("QMarkdown setup");

  const answers = await group(
    {
      import_md: () =>
        confirm({
          message: "Do you want to be able to import markdown (*.md) files?",
          initialValue: true,
        }),
    },
    {
      onCancel: () => {
        cancel("Operation cancelled.");
        process.exit(0);
      },
    },
  );

  outro("QMarkdown prompt setup complete.");

  return answers;
});
