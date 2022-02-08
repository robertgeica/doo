const chalk = require("chalk");
const { error, success, normal } = require('./colors');


const apiError = (input) => {
  console.log(
    chalk.hex(error)(
      `${input}`,
      chalk.hex(normal)(`Stuck? Try on www.doocli.ro`)
    )
  );
};

const apiSuccess = (input) => {
  console.log(
    chalk.hex(success)(
      `${input}`)
  )
};

module.exports = { apiSuccess, apiError }