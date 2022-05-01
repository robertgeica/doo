const axios = require("axios");
const keytar = require("keytar");
const { getUser } = require("./auth");
const { apiSuccess, apiError } = require("../ui/api");
const { getWorkplace } = require("../api/workplace");
const { getProfile } = require("./profile");

const addCollection = async (name) => {
  const user = await getUser();
  const profile = await getProfile();
  const token = await keytar.getPassword("doocli", "token");

  if (user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const newCollection = {
      workplaceId: profile.defaults.workplace,
      name: name,
      icon: null,
      background: null,
      comments: [],
      labels: [],
      blocks: [],
    };

    const body = JSON.stringify(newCollection);
    try {
      const res = await axios.post(
        `http://localhost:4000/api/collection/${user._id}`,
        body,
        config
      );

      apiSuccess(`New collection added: ${res.data.createdCollection.name}!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const getCollections = async () => {
  const profile = await getProfile();
  const crtWorkplace = await getWorkplace();
  const collectionId = profile.defaults.collection;
  const collections = crtWorkplace.collections.map((col) => {
    if (col.collectionId === collectionId) {
      return { name: col.collectionName, isDefault: true };
    }
    return { name: col.collectionName, isDefault: false };
  });
  return collections;
};

const setCollection = async (name) => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");
  const workplace = await getWorkplace();
  const collections = workplace.collections;

  const collection = collections.filter((col) => col.collectionName == name)[0];

  if (user && workplace) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const collectionId = collection.collectionId;
    const profileId = user.profileId;
    try {
      const res = await axios.get(
        `http://localhost:4000/api/collection/${collectionId}`,
        config
      );

      await axios.patch(
        `http://localhost:4000/api/user/profile/${profileId}`,
        { defaults: { collection: res.data.collection._id } },
        config
      );

      apiSuccess(`Collection ${name} has been set to default!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const getCollection = async () => {
  const profile = await getProfile();
  const token = await keytar.getPassword("doocli", "token");
  const collectionId = profile.defaults.collection;

  if (profile && collectionId) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.get(
        `http://localhost:4000/api/collection/${collectionId}`,
        config
      );

      return res.data;
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const deleteCollection = async (name) => {
  const workplace = await getWorkplace();
  const token = await keytar.getPassword("doocli", "token");
  const collection = workplace.collections.filter(
    (col) => col.collectionName === name
  );

  if (workplace && collection) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const collectionId = collection[0].collectionId;

    try {
      await axios.delete(
        `http://localhost:4000/api/collection/${collectionId}`,
        config
      );

      apiSuccess(`Collection ${name} has been deleted!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const updateCollection = async (name, newName) => {
  const token = await keytar.getPassword("doocli", "token");
  const workplace = await getWorkplace();
  const collection = await workplace.collections.filter(
    (collection) => collection.collectionName === name
  );

  if (collection) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const id = await collection[0].collectionId;
    try {
      await axios.patch(
        `http://localhost:4000/api/collection/${id}`,
        { name: newName },
        config
      );

      apiSuccess(`Collection ${newName} has been updated!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

const addCollectionComment = async ( content) => {
  const token = await keytar.getPassword("doocli", "token");
  const user = await getUser();
  const {collection} = await getCollection();

  if (collection) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const id = await collection._id;

    const body = {
      comments: [
       ...collection.comments,
        { accountId: user._id, accountName: user.username, content: content },
      ],
    };

    try {
      await axios.patch(
        `http://localhost:4000/api/collection/${id}`,
        body,
        config
      );

      apiSuccess(`Collection ${name} has been updated with your comment!`);
    } catch (error) {
      if (error) apiError("Sorry, something went wrong.");
    }
  }
};

module.exports = {
  addCollection,
  getCollections,
  setCollection,
  getCollection,
  deleteCollection,
  updateCollection,
  addCollectionComment,
};
