const {
  addCollection,
  getCollections,
  setCollection,
  getCollection,
  deleteCollection,
} = require("../api/collection");
const { renderCollections, renderCollection } = require("../ui/collection");

const addCollectionCmd = {
  command: "ac",
  describe: "add collection",

  async handler(argv) {
    addCollection(argv._[1]);
  },
};

const viewCollectionsCmd = {
  command: "vcs",
  describe: "view collections",

  async handler() {
    const collections = await getCollections();
    renderCollections(collections);
  },
};

const setCollectionCmd = {
  command: "sc",
  describe: "set collection",

  async handler(argv) {
    setCollection(argv._[1]);
  },
};

const viewCollectionCmd = {
  command: "vc",
  describe: "view collection",

  async handler() {
    const crtCollection = await getCollection();
    await renderCollection(crtCollection);
  },
};

const deleteCollectionCmd = {
  command: "dc",
  describe: "delete collection",

  async handler(argv) {
    await deleteCollection(argv._[1]);
  },
};

module.exports = {
  addCollectionCmd,
  viewCollectionsCmd,
  setCollectionCmd,
  viewCollectionCmd,
  deleteCollectionCmd,
};
