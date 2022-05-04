// const {  renderBlock } = require("../ui/block");
var inquirer = require("inquirer");
const { addBlock, getBlocks, setBlock } = require("../api/block");
const { getProfile } = require("../api/profile");
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
    const { blocks } = await getBlocks();
    const profile = await getProfile();
    renderBlocks(blocks, profile.defaults.block);
  },
};

const setBlockCmd = {
  command: "sb",
  describe: "set block",
  
  async handler(argv) {
    setBlock(argv._[1]);
  },
};
module.exports = {
  addBlockCmd,
  viewBlocksCmd,
  setBlockCmd
};
