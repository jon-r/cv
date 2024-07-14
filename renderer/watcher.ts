import { INPUT_PATH, OUTPUT_PATH, updateHtml } from "./generator.ts";
import { debounce } from "./util.ts";

await Deno.mkdir(`${OUTPUT_PATH}/assets`, { recursive: true });

const debouncedUpdateHtml = debounce(updateHtml, 300);

console.log("watching...");
const templateWatcher = Deno.watchFs(`${INPUT_PATH}/`);

for await (const _event of templateWatcher) {
  debouncedUpdateHtml();
}
