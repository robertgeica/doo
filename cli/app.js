#!/usr/bin/env node

const yargs = require("yargs");
const { registerUser, loginUser, getUser } = require('./api/auth');
const { addWorkplace, getWorkplaces, setWorkplace, getWorkplace } = require('./api/workplace');
const { userAccountInfo } = require('./ui/user');
const { renderWorkplaces, renderWorkplace } = require('./ui/workplace');

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

// get user
yargs.command({
  command: 'user',
  describe: 'user',

  async handler() {
    const user = await getUser();
    userAccountInfo(user);
  }
});

//add workplace
yargs.command({
  command: 'aw',
  describe: 'add workplace',

  async handler(argv) {
    addWorkplace(argv._[1]);
  }
})

//get workplaces
yargs.command({
  command: 'vws',
  describe: 'view workplaces',

  async handler() {
    const workplaces = await getWorkplaces();
    renderWorkplaces(workplaces);
  }
})

//set workplaces
yargs.command({
  command: 'sw',
  describe: 'set workplace',

  async handler(argv) {
    setWorkplace(argv._[1]);
  }
})

// view workplace
yargs.command({
  command: 'vw',
  describe: 'view current workplace',

  async handler() {
    const crtWorkplace = await getWorkplace();
    renderWorkplace(crtWorkplace);
  }
})

// edit workplace

// delete workplace



/* logout user */
yargs.parse();
