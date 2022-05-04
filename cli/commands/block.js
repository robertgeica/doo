// const {  renderBlock } = require("../ui/block");
var inquirer = require("inquirer");
const { addBlock, getBlocks } = require("../api/block");
const { renderBlocks } = require('../ui/block');
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

const viewBlocksCmd = {
  command: "vbs",
  describe: "view blocks",

  async handler() {
    const blocks = await getBlocks();
    renderBlocks(blocks);
  },
};

module.exports = {
  addBlockCmd,
  viewBlocksCmd
};
