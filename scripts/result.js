const constants = require("./constants");

exports.show = text => {
  $ui.push({
    props: {
      title: "transpiled"
    },
    views: [
      {
        type: "text",
        props: {
          font: constants.editorFont,
          text: text
        },
        layout: $layout.fill
      }
    ]
  });
}