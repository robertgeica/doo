#!/usr/bin/env node

const yargs = require("yargs");
const { registerUser, loginUser, getUser, logoutUser } = require("./api/auth");
const { userAccountInfo } = require("./ui/user");
const { addWorkplaceCmd, viewWorkplacesCmd, setWorkplaceCmd, viewWorkplaceCmd } = require('./commands/workplace')

// register user
yargs.command({
  command: "register",
  describe: "register user",

  async handler(argv) {
    registerUser(argv._[1], argv._[2]);
  },
});

// login user
yargs.command({
  command: "login",
  describe: "login user",

  async handler(argv) {
    loginUser(argv._[1], argv._[2]);
  },
});

// logout user
yargs.command({
  command: "logout",
  describe: "logout user",

  async handler() {
    logoutUser();
  },
});

// get user
yargs.command({
  command: "user",
  describe: "user",

  async handler() {
    const user = await getUser();
    userAccountInfo(user);
  },
});

/* WORKPLACES */
// doo aw (add workplace)
yargs.command(addWorkplaceCmd);

// doo vws (view workplaces)
yargs.command(viewWorkplacesCmd);

// doo sw (set workplaces)
yargs.command(setWorkplaceCmd);

// doo vw (view workplace)
yargs.command(viewWorkplaceCmd);

// doo uw (update workplace)
yargs.command(updateWorkplaceCmd);

// doo dw (delete workplace)
yargs.command(deleteWorkplaceCmd);

yargs.parse();
