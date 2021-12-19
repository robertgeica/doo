#!/usr/bin/env node

const yargs = require("yargs");
const { registerUser, loginUser, getUser, getWorkplaces } = require("./actions");

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

yargs.command({
  command: 'user',
  describe: 'user',

  async handler() {
    getUser();
  }
});

yargs.command({
  command: 'workplace',
  describe: 'workplace',

  async handler() {
    getWorkplaces();
  }
})

yargs.parse();
