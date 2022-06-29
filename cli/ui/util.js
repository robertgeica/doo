const chalk = require("chalk");
const { error, success, normal } = require('./colors');


const actionNeededWarning = (input) => {
  console.log(
    chalk.hex(error)(
      `${input}`,
      chalk.hex(normal)(`Stuck? Try on www.doocli.ro`)
    )
  );
};


module.exports = { actionNeededWarning }