const {
  addWorkplace,
  getWorkplaces,
  setWorkplace,
  getWorkplace,
  deleteWorkplace,
  updateWorkplace,
} = require("../api/workplace");
const { getProfile } = require("../api/profile");
const { renderWorkplaces, renderWorkplace } = require("../ui/workplace");

const { actionNeededWarning } = require("../ui/util");
const { checkConnectedUser } = require("../ui/user");

const addWorkplaceCmd = {
  command: "aw",
  describe: "add workplace",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      addWorkplace(argv._[1]);
    }
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
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      setWorkplace(argv._[1]);
    }
  },
};

const viewWorkplaceCmd = {
  command: "vw",
  describe: "view current workplace",

  async handler() {
    const isConnectedUser = await checkConnectedUser();
    const profile = await getProfile();

    if (isConnectedUser) {
      if (typeof profile.defaults.workplace === "undefined") {
        return actionNeededWarning(
          'Add a default workplace first. Tip: use "sw" command.'
        );
      }

      const crtWorkplace = await getWorkplace();
      renderWorkplace(crtWorkplace);
    }
  },
};

const editWorkplaceCmd = {
  command: "ew",
  describe: "edit workplace",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    const profile = await getProfile();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined" || typeof argv._[2] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      await updateWorkplace(argv._[1], argv._[2]);
    }
  },
};

const deleteWorkplaceCmd = {
  command: "dw",
  describe: "delete workplace",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    const profile = await getProfile();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      await deleteWorkplace(argv._[1]);
    }
  },
};

module.exports = {
  addWorkplaceCmd,
  viewWorkplacesCmd,
  setWorkplaceCmd,
  viewWorkplaceCmd,
  deleteWorkplaceCmd,
  editWorkplaceCmd,
};
