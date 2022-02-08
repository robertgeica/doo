const axios = require("axios");
const keytar = require("keytar");
const { apiSuccess, apiError } = require('../ui/api');

const registerUser = async (email, password) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    await axios.post(
      "http://localhost:4000/api/user/register",
      body,
      config
    );
    apiSuccess(`Hi, ${email}! Your account was created.`);
  } catch (error) {
    if (error) apiError('Sorry, something went wrong.');
  }
};

const loginUser = async (email, password) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const body = { email, password };

    const res = await axios.post(
      "http://localhost:4000/api/user/login",
      body,
      config
    );

    keytar.setPassword("doocli", "token", res.data.token);
    keytar.setPassword("doocli", "userId", res.data._id);

    apiSuccess(`Hi, ${email}! You are now logged in, enjoy our app!`);
  } catch (error) {
    if (error) apiError('Sorry, something went wrong.');
  }
};

const getUser = async () => {
  const token = await keytar.getPassword("doocli", "token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:4000/api/user`,
      config
    );

    return res.data; 
  } catch (error) {
    if (error) apiError('Sorry, something went wrong.');
  }
};

module.exports = { registerUser, loginUser, getUser };
