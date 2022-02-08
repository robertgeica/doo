const chalk = require("chalk");
const { error, success, normal, workplace } = require('./colors');

const addWorkplaceSuccess = (input) => {
  console.log(
    chalk.hex(success)(
      `${input}`)
  )
};

const renderWorkplaces = workplacesArr => {
  console.log(chalk.hex(normal)(`These are your workplaces:`));
  workplacesArr.forEach(wp => {
    console.log(chalk.hex(workplace).bold(`@${wp}`));
  });
  console.log(chalk.hex(normal)(`Use 'doo sw [workplaceName]' to set a current workplace.`));
}

const renderWorkplace = crtWorkplace => {
  console.log(chalk.hex(workplace).bold(`@${crtWorkplace}`));
}
module.exports = { addWorkplaceSuccess, renderWorkplaces, renderWorkplace }