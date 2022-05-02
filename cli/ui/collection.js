const chalk = require("chalk");
const { error, success, normal, workplace } = require("./colors");

const renderCollections = (collections) => {
  console.log(
    chalk.hex(normal)(`These are your collections in current workplace:`)
  );

  collections.forEach((collection) => {
    collection.isDefault
      ? console.log(chalk.hex(workplace).bold(`@${collection.name}`))
      : console.log(chalk.hex(workplace)(`@${collection.name}`));
  });
  console.log(
    chalk.hex(normal)(
      `Use 'doo sc [collectionName]' to set a current collection.`
    )
  );
};

const renderCollection = ({ collection }) => {
  const icon = "💽";
  console.log(
    `${icon} ${chalk.hex(workplace).bold(`@${collection.name}`)}`,
    `\t${collection.blocks.length} blocks`,
    `\t${collection.comments.length} comments`
  );
};

const renderCollectionComments = (collection) => {
  const { comments } = collection;
  console.log(`Comments in ${chalk.hex(workplace).bold(collection.name)} collection:`)
  comments.forEach((comment) => {
      console.log(`${comment.content}`, chalk.bold(`by ${comment.accountName}`));
  });

};

module.exports = { renderCollections, renderCollection, renderCollectionComments };
