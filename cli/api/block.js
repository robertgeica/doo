const axios = require("axios");
const keytar = require("keytar");
const { getUser } = require("./auth");
const { apiSuccess, apiError } = require("../ui/api");
// const { getWorkplace } = require("../api/workplace");
// const { getProfile } = require("./profile");
const { getCollection } = require("./collection");

const addBlock = async (blockName, blockType, blockContent) => {
  const user = await getUser();
  const { collection } = await getCollection();
  const token = await keytar.getPassword("doocli", "token");

  blockContent = {
    ...blockContent,
    description: "",
    status: "",
    deadline: null,
    isRecurrent: {},
    isArchived: false,
    sessionsTotalTime: 0,
    labels: [],
    sessions: [],
    milestones: [],
    blocks: [],
  };

  const block = {
    userId: user._id,
    parentId: collection._id,

    icon: "",
    background: "",

    blockName,
    textFormat: {
      textColor: "",
      backgroundColor: "",
    },

    comments: [],

    blockType,
    blockContent,
  };

  if (user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = JSON.stringify(block);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/block/${user._id}`,
        body,
        config
      );
      apiSuccess(`New block added: ${res.data.block.blockName}!`);
    } catch (error) {
      console.log(error);
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

module.exports = {
  addBlock,
};
