import { watch } from "node:fs/promises";

import { INPUT_PATH, updateHtml } from "./generator.ts";
import { debounce } from "./util.ts";

const debouncedUpdateHtml = debounce(updateHtml, 300);

console.log("watching...");
const templateWatcher = watch(`${INPUT_PATH}/`, { recursive: true });

for await (const _event of templateWatcher) {
  debouncedUpdateHtml();
}
