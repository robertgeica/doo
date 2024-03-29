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
  editCollectionCmd,
  viewCollectionCommentsCmd,
  addCollectionCommentCmd,
  deleteCollectionCommentCmd,
  viewCollectionLabelsCmd,
  addCollectionLabelCmd,
  deleteCollectionLabelCmd,
} = require("./commands/collection");
const {
  addBlockCmd,
  viewBlocksCmd,
  setBlockCmd,
  viewBlockCmd,
  deleteBlockCmd,
  editBlockCmd,
} = require("./commands/block");

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
yargs.command(editCollectionCmd);

// doo dc (delete collection)
yargs.command(deleteCollectionCmd);

// doo vcc (view collection comments)
yargs.command(viewCollectionCommentsCmd);

// doo acc (add collection comment)
yargs.command(addCollectionCommentCmd);

// doo dcc (delete collection comment)
yargs.command(deleteCollectionCommentCmd);

// doo vcl (view collection labels)
yargs.command(viewCollectionLabelsCmd);

// doo acl (add collection label)
yargs.command(addCollectionLabelCmd);

// doo dcl (delete collection label)
yargs.command(deleteCollectionLabelCmd);

// doo vbs (view blocks)
yargs.command(viewBlocksCmd);

// doo sb (set block)
yargs.command(setBlockCmd);

// doo vb (view block)
yargs.command(viewBlockCmd);

// doo ab (add block)
yargs.command(addBlockCmd);

// doo db (delete block)
yargs.commands(deleteBlockCmd);

// doo eb (edit block)
yargs.command(editBlockCmd);

//

//

yargs.parse();
