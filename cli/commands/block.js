// const {  renderBlock } = require("../ui/block");
const yargsInteractive = require("yargs-interactive");
var inquirer = require("inquirer");
const { addBlock } = require("../api/block");
const {
  simpleBlockOptions,
  complexBlockOptions,
  taskBlockOptions,
} = require("./block-types");

const addBlockCmd = {
  command: "ab",
  describe: "add block",

  async handler(argv) {
    const blockName = argv._[1];
    const blockType = argv._[2] || "task";

    let selectedOptions = null;
    if (blockType === "simple") selectedOptions = simpleBlockOptions;
    if (blockType === "complex") selectedOptions = complexBlockOptions;
    selectedOptions =
      selectedOptions === null ? taskBlockOptions : selectedOptions;

    inquirer
      .prompt([ ...selectedOptions])
      .then((result) => addBlock(blockName, blockType, result))
      .catch((error) => console.log(error));

  },
};

module.exports = {
  addBlockCmd,
};
