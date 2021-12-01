const axios = require("axios");
const keytar = require("keytar");

const registerUser = async (email, password) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      "http://localhost:4000/api/user/register",
      body,
      config
    );
    console.log(`New user was created.`, res.data);
  } catch (error) {
    if (error) console.log(`Error: ${error}`);
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

    keytar.setPassword("doocli", password, res.data.token);
  } catch (error) {
    if (error) console.log(`Error: ${error}`);
  }
};


module.exports = { registerUser, loginUser };
