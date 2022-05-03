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
  deleteCollectionLabel
} = require("../api/collection");
const { renderCollections, renderCollection, renderCollectionComments, renderCollectionLabels } = require("../ui/collection");

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

const editCollectionCmd = {
  command: "ec",
  describe: "edit collection",

  async handler(argv) {
    await updateCollection(argv._[1], argv._[2]);
  },
};

// viewCollectionCommentsCmd
const viewCollectionCommentsCmd = {
  command: "vcc",
  describe: "view collection comments",

  async handler() {
    const { collection } = await getCollection();
    renderCollectionComments(await collection);
  },
}

// addCollectionCommentCmd
const addCollectionCommentCmd = {
  command: "acc",
  describe: "add collection comment",

  async handler(argv) {
    await addCollectionComment(argv._[1], argv._[2]);
  },
};


const deleteCollectionCommentCmd = {
  command: "dcc",
  describe: "add collection comment",

  async handler(argv) {
    await deleteCollectionComment(argv._[1]);
  },
};

const viewCollectionLabelsCmd = {
  command: "vcl",
  describe: "view collection comments",

  async handler() {
    const { collection } = await getCollection();
    renderCollectionLabels(await collection);
  },
}

const addCollectionLabelCmd = {
  command: 'acl',
  describe: 'add collection label',

  async handler(argv) {
    await addCollectionLabel(argv._[1], argv._[2]);
  }
}

const deleteCollectionLabelCmd = {
  command: 'dcl',
  describe: 'delete collection label',

  async handler(argv) {
    await deleteCollectionLabel(argv._[1]);
  }
}

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
  deleteCollectionLabelCmd
};
