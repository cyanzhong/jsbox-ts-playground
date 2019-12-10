const ts = require("typescript");
const source = $context.query.source;

const result = ts.transpileModule(source, {
  compilerOptions: {
    target: "ES2015",
    module: ts.ModuleKind.CommonJS
  }
});

$jsbox.notify("transpileDidFinish", {
  result: result
});