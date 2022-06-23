const chalk = require("chalk");
const { error, success, normal, workplace } = require("./colors");

const renderWorkplaces = (workplacesArr) => {
  console.log(chalk.hex(normal)(`These are your workplaces:`));

  workplacesArr.forEach((wp) => {
    wp.isDefault
      ? console.log(chalk.hex(workplace).bold(`@${wp.name}`))
      : console.log(chalk.hex(workplace)(`@${wp.name}`));
  });
  console.log(
    chalk.hex(normal)(
      `Use 'doo sw [workplaceName]' to set a current workplace.`
    )
  );
};

const renderWorkplace = (crtWorkplace) => {
  // const icon = "💾";
  const icon = '';
  console.log(
    `${icon} ${chalk.hex(workplace).bold(`@${crtWorkplace.workplaceName}`)}`
  );
  renderFavorites(crtWorkplace.favorites);
  renderCollections(crtWorkplace.collections);
};

const renderCollections = (collectionsArr) => {
  const line = "----------";
  const icon = "🔵";

  console.log(line);
  collectionsArr.map((col) =>
    console.log(
      `  ${col.collectionIcon} ${chalk.hex(workplace).bold(`@${col.collectionName}`)}`
    )
  );
};

const renderFavorites = (favoritesArr) => {
  const icon = "💙";

  favoritesArr.map((fav) =>
    console.log(`  ${icon} ${chalk.hex(workplace).bold(`@${fav.blockName}`)}`)
  );
};

module.exports = { renderWorkplaces, renderWorkplace };
