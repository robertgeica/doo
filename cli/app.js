#!/usr/bin/env node

const yargs = require("yargs");
const {
  addWorkplaceCmd,
  viewWorkplacesCmd,
  setWorkplaceCmd,
  viewWorkplaceCmd,
  deleteWorkplaceCmd,
  editWorkplaceCmd,
} = require("./commands/workplace");
const {
  addCollectionCmd,
  viewCollectionsCmd,
  setCollectionCmd,
  viewCollectionCmd,
  deleteCollectionCmd,
} = require("./commands/collection");
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

// doo sw (set workplace)
yargs.command(setWorkplaceCmd);

// doo vw (view workplace)
yargs.command(viewWorkplaceCmd);

// doo ew (edit workplace)
yargs.command(editWorkplaceCmd);

// doo dw (delete workplace)
yargs.command(deleteWorkplaceCmd);

/* COLLECTIONS */
// doo ac (add collection)
yargs.command(addCollectionCmd);

// doo vcs (view collections)
yargs.command(viewCollectionsCmd);

// doo sc (set collection)
yargs.command(setCollectionCmd);

// doo vc (view collection)
yargs.command(viewCollectionCmd);

// doo ec (edit collection)
// yargs.command(editCollectionCmd);

// doo dc (delete collection)
yargs.command(deleteCollectionCmd);

// doo acc (add collection comment)
// yargs.command(addCollectionCommentCmd);

// doo dcc (delete collection comment)
// yargs.command(deleteCollectionCommentCmd);

// doo acl (add collection label)
// yargs.command(addCollectionLabelCmd);

// doo dcl (delete collection label)
// yargs.command(deleteCollectionLabelCmd);

yargs.parse();
