const constants = require("./constants");

exports.init = () => {

  $ui.render({
    props: {
      navButtons: [
        {
          symbol: "wand.and.stars.inverse",
          handler: transform
        },
        {
          symbol: "list.bullet",
          handler: selectExample
        }
      ]
    },
    views: [
      {
        type: "text",
        props: {
          id: "textView",
          font: constants.editorFont,
          text: loadFile("Hello World.ts")
        },
        layout: $layout.fill
      }
    ]
  });
}

async function selectExample() {
  const examples = $file.list("examples");
  const {title} = await $ui.menu(examples);
  if (title) {
    $("textView").text = loadFile(title);
  }
}

function loadFile(name) {
  const file = $file.read(`examples/${name}`);
  return file.string;
}

function transform() {
  $nodejs.run({
    path: "transpiler.js",
    query: {
      source: $("textView").text
    },
    listener: {
      id: "transpileDidFinish",
      handler: response => {
        const transpiled = response.result.outputText;
        const result = require("./result");
        result.show(transpiled);
      }
    }
  });
}