const chalk = require("chalk");
const { error, success, normal, workplace } = require("./colors");

const renderBlocks = (blocks, blockId) => {
  console.log(
    chalk.hex(normal)(`These are your blocks in current collection:`)
  );

    blocks.forEach((block) => {
      const icon =  block.icon ? block.icon : "📁";
      console.log(
        `${icon} ${
          block._id === blockId
            ? `${chalk.hex(workplace).bold(`@${block.blockName}`)}`
            : `${chalk.hex(workplace)(`@${block.blockName}`)}`
        }`,
        `\t${chalk
          .hex(block.blockContent.status.color ? block.blockContent.status.color : '')
          .bold(`${block.blockContent.status.label ? block.blockContent.status.label : ''}`)}`,
        `\t${block.blockContent.priority}`,
        `\t${block.comments.length} comments`
      );
    });

  console.log(
    chalk.hex(normal)(`Use 'doo sb [blockName]' to set a current block.`)
  );
};

const renderBlock = (block) => {
  const icon = typeof block.icon !== "undefined" ? block.icon : "📁";
  console.log(
    `${icon} ${chalk.hex(workplace).bold(`@${block.blockName}`)}`,
    `\t${chalk
      .hex(block.blockContent.status.color ? block.blockContent.status.color : '')
      .bold(`${block.blockContent.status.label ? block.blockContent.status.label : ''}`)}`,
    `\t${block.blockContent.priority}`,
    `\t${block.blockContent.estimation}h`,
    `\t${block.blockType.toUpperCase()}`,
    `\t${block.blockContent.deadline}`,
    `\t${block.blockContent.description}`,
    `\n${block.comments.length} comments`,
    `\t${block.blockContent.labels.length} labels`,
    `\t${block.blockContent.sessions.length} sessions`,
    `\t${block.blockContent.blocks.length} blocks`
  );
};

module.exports = { renderBlocks, renderBlock };
