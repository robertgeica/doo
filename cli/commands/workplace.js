const {
  addWorkplace,
  getWorkplaces,
  setWorkplace,
  getWorkplace,
  deleteWorkplace,
  updateWorkplace
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

const editWorkplaceCmd = {
  command: "ew",
  describe: "edit workplace",

  async handler(argv) {
    await updateWorkplace(argv._[1], argv._[2]);
  },
};

const deleteWorkplaceCmd = {
  command: "dw",
  describe: "delete workplace",

  async handler(argv) {
    await deleteWorkplace(argv._[1]);
  },
};


module.exports = {
  addWorkplaceCmd,
  viewWorkplacesCmd,
  setWorkplaceCmd,
  viewWorkplaceCmd,
  deleteWorkplaceCmd,
  editWorkplaceCmd
};
