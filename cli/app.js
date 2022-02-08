#!/usr/bin/env node

const yargs = require("yargs");
const {
  addWorkplaceCmd,
  viewWorkplacesCmd,
  setWorkplaceCmd,
  viewWorkplaceCmd,
  deleteWorkplaceCmd
} = require("./commands/workplace");
const {
  registerUserCmd,
  loginUserCmd,
  logoutUserCmd,
  connectedUserCmd,
} = require("./commands/user");

/* USER */
// doo register (register user)
yargs.command(registerUserCmd);

// doo login (login user)
yargs.command(loginUserCmd);

// doo logout (logout user)
yargs.command(logoutUserCmd);

// doo user (get connected user)
yargs.command(connectedUserCmd);


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
// yargs.command(updateWorkplaceCmd);

// doo dw (delete workplace)
yargs.command(deleteWorkplaceCmd);

yargs.parse();
