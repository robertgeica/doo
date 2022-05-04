var inquirer = require("inquirer");

const simpleBlockOptions = [{ name: "Simple block" }];
const complexBlockOptions = [{ name: "Complex block" }];

const taskBlockOptions = [{ name: "priority" }, { name: "estimation" }];

const editTaskBlockOptions = [
  {
    type: "checkbox",
    message: "Select fields to edit:",
    name: "block",
    choices: [
      { name: "blockName" },
      { name: "priority" },
      { name: "estimation" },
      { name: "description" },
      { name: "status" },
      { name: "deadline" },
      { name: "isArchived" },
    ],

  },
];

module.exports = {
  simpleBlockOptions,
  complexBlockOptions,
  taskBlockOptions,
  editTaskBlockOptions,
};
