const axios = require("axios");
const keytar = require("keytar");
const { getUser } = require('./auth');

const getProfile = async () => {
  const user = await getUser();
  const token = await keytar.getPassword("doocli", "token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:4000/api/user/profile/${user.profileId}`,
      config
    );

    return res.data; 
  } catch (error) {
    if (error) apiError('Sorry, something went wrong.');
  }
};

module.exports = { getProfile };
