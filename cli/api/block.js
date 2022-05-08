const axios = require("axios");
const keytar = require("keytar");
const { getUser } = require("./auth");
const { apiSuccess, apiError } = require("../ui/api");
// const { getWorkplace } = require("../api/workplace");
const { getProfile } = require("./profile");
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

const getBlocks = async () => {
  const token = await keytar.getPassword("doocli", "token");
  const user = await getUser();
  const { collection } = await getCollection();

  const blocks =  collection.blocks;
  // console.log('get blocks api', blocks)

  if (user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      data: { ids: blocks}
    };
    try {
      const res = await axios.get(
        `http://localhost:4000/api/block/`,
        config,
      );

      return res.data;
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
}

const setBlock = async (name) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");
  const { blocks } = await getBlocks();
  const block = blocks.filter((block) => block.blockName == name)[0];
  if (user && block) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const blockId = block._id;
    const profileId = user.profileId;
    try {
      await axios.patch(
        `http://localhost:4000/api/user/profile/${profileId}`,
        { defaults: { block: blockId } },
        config
      );

      apiSuccess(`Block ${block.blockName} has been set to default!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const getBlock = async () => {
  const token = await keytar.getPassword("doocli", "token");
  const user = await getUser();
  const profile = await getProfile();

  const blockId = profile.defaults.block;
  if (user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      }
    };
    try {
      const res = await axios.get(
        `http://localhost:4000/api/block/${blockId}`,
        config,
      );
      return res.data;
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
}

const deleteBlock = async (name) => {
  const token = await keytar.getPassword("doocli", "token");
  const { blocks } = await getBlocks();

  const block = blocks.filter(block => block.blockName !== name);
  const blockId = block[0]._id;

  if (block) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(
        `http://localhost:4000/api/block/${blockId}`,
        config
      );

      apiSuccess(`Block ${name} has been deleted!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const updateBlock = async (updatedFields, blockName) => {
  const token = await keytar.getPassword("doocli", "token");
  // if blockName, call other api route
  const { block } = await getBlock();


  const newBlock = {
    ...block,
    blockName: updatedFields.blockName || block.blockName,
    blockContent: { ...block.blockContent, ...updatedFields },
  }
  delete newBlock.blockContent.blockName;
  if (block) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.patch(
        `http://localhost:4000/api/block/${block._id}`,
        {block: newBlock},
        config
      );

      apiSuccess(`Block ${block.blockName} has been updated!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

module.exports = {
  addBlock,
  getBlocks,
  setBlock,
  getBlock,
  deleteBlock,
  updateBlock
};
