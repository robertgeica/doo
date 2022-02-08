const {
  addWorkplace,
  getWorkplaces,
  setWorkplace,
  getWorkplace,
} = require("../api/workplace");
const { renderWorkplaces, renderWorkplace } = require("../ui/workplace");

const addWorkplaceCmd = {
  command: "aw",
  describe: "add workplace",

  async handler(argv) {
    addWorkplace(argv._[1]);
  },
};

const viewWorkplacesCmd = {
  command: "vws",
  describe: "view workplaces",

  async handler() {
    const workplaces = await getWorkplaces();
    renderWorkplaces(workplaces);
  },
};

const setWorkplaceCmd = {
  command: "sw",
  describe: "set workplace",

  async handler(argv) {
    setWorkplace(argv._[1]);
  },
};

const viewWorkplaceCmd = {
  command: "vw",
  describe: "view current workplace",

  async handler() {
    const crtWorkplace = await getWorkplace();
    renderWorkplace(crtWorkplace);
  },
};

// const updateWorkplaceCmd = {};
// const deleteWorkplaceCmd = {};


module.exports = {
  addWorkplaceCmd,
  viewWorkplacesCmd,
  setWorkplaceCmd,
  viewWorkplaceCmd,
};
