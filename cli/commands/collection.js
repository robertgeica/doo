const {
  addCollection,
  getCollections,
  setCollection,
  getCollection,
  deleteCollection,
  updateCollection,
  addCollectionComment,
  deleteCollectionComment,
  addCollectionLabel,
  deleteCollectionLabel,
} = require("../api/collection");
const {
  renderCollections,
  renderCollection,
  renderCollectionComments,
  renderCollectionLabels,
} = require("../ui/collection");
const { getProfile } = require("../api/profile");

const { checkConnectedUser } = require("../ui/user");
const { actionNeededWarning } = require("../ui/util");

const addCollectionCmd = {
  command: "ac",
  describe: "add collection",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {

      if (typeof argv._[1] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      addCollection(argv._[1]);
    }
  },
};

const viewCollectionsCmd = {
  command: "vcs",
  describe: "view collections",

  async handler() {
    const isConnectedUser = await checkConnectedUser();
    const profile = await getProfile();
    if (isConnectedUser) {
      if (typeof profile.defaults.workplace === "undefined") {
        return actionNeededWarning(
          'Add a default workplace first. Tip: use "sw" command.'
        );
      }

      const collections = await getCollections();
      renderCollections(collections);
    }
  },
};

const setCollectionCmd = {
  command: "sc",
  describe: "set collection",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      setCollection(argv._[1]);
    }
  },
};

const viewCollectionCmd = {
  command: "vc",
  describe: "view collection",

  async handler() {
    const isConnectedUser = await checkConnectedUser();
    const profile = await getProfile();

    if (isConnectedUser) {
      if (typeof profile.defaults.collection === "undefined") {
        return actionNeededWarning(
          'Add a default collection first. Tip: use "sc" command.'
        );
      }

      const crtCollection = await getCollection();
      await renderCollection(crtCollection);
    }
  },
};

const deleteCollectionCmd = {
  command: "dc",
  describe: "delete collection",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      await deleteCollection(argv._[1]);
    }
  },
};

const editCollectionCmd = {
  command: "ec",
  describe: "edit collection",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      if (typeof argv._[1] === "undefined" || typeof argv._[2] === "undefined") {
        return actionNeededWarning(
          'Incomplete command. Tip: use "help" command for more info.'
        );
      }
      await updateCollection(argv._[1], argv._[2]);
    }
  },
};

// viewCollectionCommentsCmd
const viewCollectionCommentsCmd = {
  command: "vcc",
  describe: "view collection comments",

  async handler() {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      const { collection } = await getCollection();
      renderCollectionComments(await collection);
    }
  },
};

// addCollectionCommentCmd
const addCollectionCommentCmd = {
  command: "acc",
  describe: "add collection comment",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      await addCollectionComment(argv._[1], argv._[2]);
    }
  },
};

const deleteCollectionCommentCmd = {
  command: "dcc",
  describe: "add collection comment",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      await deleteCollectionComment(argv._[1]);
    }
  },
};

const viewCollectionLabelsCmd = {
  command: "vcl",
  describe: "view collection comments",

  async handler() {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      const { collection } = await getCollection();
      renderCollectionLabels(await collection);
    }
  },
};

const addCollectionLabelCmd = {
  command: "acl",
  describe: "add collection label",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      await addCollectionLabel(argv._[1], argv._[2]);
    }
  },
};

const deleteCollectionLabelCmd = {
  command: "dcl",
  describe: "delete collection label",

  async handler(argv) {
    const isConnectedUser = await checkConnectedUser();
    if (isConnectedUser) {
      await deleteCollectionLabel(argv._[1]);
    }
  },
};

module.exports = {
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
};
