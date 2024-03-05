import HighlightJS from "./highlight.js";
// @ts-ignore
import * as builtIns from "builtInLanguages";

const hljs = HighlightJS;

for (const key of Object.keys(builtIns)) {
  // our builtInLanguages Rollup plugin has to use `_` to allow identifiers to be
  // compatible with `export` naming conventions, so we need to convert the
  // identifiers back into the more typical dash style that we use for language
  // naming via the API
  const languageName = key.replace("grmr_", "").replace("_", "-");
  hljs.registerLanguage(languageName, builtIns[key]);
}
class DataLanguagePlugin {
  prefix;
  constructor(options) {
    this.prefix = options.dataPrefix;
  }
  "after:highlight"(result) {
    result.value = result.value.replaceAll(/^«([\w-]+)»(.*)/gm, (match, p1, p2) => {
      return `<span class='${p1}'>${p2}</span>`;
    });
  }
}
hljs.addPlugin(new DataLanguagePlugin({ dataPrefix: "hljs" }));

export default hljs;
