// const {  renderBlock } = require("../ui/block");
var inquirer = require("inquirer");
const { addBlock, getBlocks, setBlock, getBlock, deleteBlock, updateBlock } = require("../api/block");
const { getProfile } = require("../api/profile");
const { renderBlocks, renderBlock } = require('../ui/block');
const {
  simpleBlockOptions,
  complexBlockOptions,
  taskBlockOptions,
  editTaskBlockOptions
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

const viewBlockCmd = {
  command: "vb",
  describe: "view block",

  async handler() {
    const { block } = await getBlock();
    renderBlock(block);
  },
};

const deleteBlockCmd = {
  command: "db",
  describe: "delete block",

  async handler(argv) {
    await deleteBlock(argv._[1]);
  },
};


const editBlockCmd = {
  command: "eb",
  describe: "edit block",

  async handler(argv) {
    const blockName = argv._[1];

    inquirer
      .prompt([ ...editTaskBlockOptions, ])
      .then((answers) => {
        const editOptions = answers.block.map(option => {return {name: option}})

        inquirer
        .prompt([ ...editOptions])
        .then((result) => {
          updateBlock(result, blockName);
        })
        .catch((error) => console.log(error));
  
      });

  },
};


module.exports = {
  addBlockCmd,
  viewBlocksCmd,
  setBlockCmd,
  viewBlockCmd,
  deleteBlockCmd,
  editBlockCmd
};
