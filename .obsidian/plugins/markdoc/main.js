/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MarkdocPlugin2
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/decorations.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var MARKDOC_BLOCK = /{% \/?[0-9a-zA-Z()$]+ \/?%}/g;
var MarkdocPlugin = class {
  constructor(view) {
    this.decorations = this.buildDecorations(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }
  destroy() {
  }
  buildDecorations(view) {
    const builder = new import_state.RangeSetBuilder();
    view.visibleRanges;
    for (const { from, to } of view.visibleRanges) {
      for (let pos = from; pos <= to; ) {
        const line = view.state.doc.lineAt(pos);
        MARKDOC_BLOCK.lastIndex = 0;
        while (true) {
          const match = MARKDOC_BLOCK.exec(line.text);
          if (!match)
            break;
          const from2 = pos + match.index;
          const to2 = pos + match.index + match[0].length;
          builder.add(from2, to2, import_view.Decoration.mark({ class: "markdoc-block" }));
        }
        pos = line.to + 1;
      }
    }
    return builder.finish();
  }
};
var pluginSpec = {
  decorations: (value) => value.decorations
};
var markdoc = import_view.ViewPlugin.fromClass(MarkdocPlugin, pluginSpec);

// src/main.ts
var MarkdocPlugin2 = class extends import_obsidian.Plugin {
  async onload() {
    this.registerExtensions(["mdoc"], "markdown");
    this.registerEditorExtension(markdoc);
  }
};
