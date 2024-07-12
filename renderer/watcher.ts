import { INPUT_PATH, updateHtml } from "./index.ts";
import { debounce } from "./util.ts";

const debouncedUpdateHtml = debounce(updateHtml, 300);

console.log("watching...");
const templateWatcher = Deno.watchFs(`${INPUT_PATH}/`);
for await (const _event of templateWatcher) {
  debouncedUpdateHtml();
}
