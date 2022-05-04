const chalk = require("chalk");
const { error, success, normal, workplace } = require("./colors");

const renderBlocks = (blocks, blockId) => {
  console.log(
    chalk.hex(normal)(`These are your blocks in current collection:`)
  );

  blocks.forEach((block) => {
    const icon = "💽";
    console.log(
      `${icon} ${
        block._id === blockId
          ? `${chalk.hex(workplace).bold(`@${block.blockName}`)}`
          : `${chalk.hex(workplace)(`@${block.blockName}`)}`
      }`,
      `\t${block.blockContent.status}`,
      `\t${block.blockContent.priority}`,
      `\t${block.blockContent.estimation}`,
      `\t${block.blockType} type`,
      `\t${block.comments.length} comments`
    );
  });

  console.log(
    chalk.hex(normal)(`Use 'doo sb [blockName]' to set a current block.`)
  );
};

module.exports = { renderBlocks };
