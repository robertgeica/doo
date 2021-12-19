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

    keytar.setPassword("doocli", "token", res.data.token);
    keytar.setPassword("doocli", "userId", res.data._id);
  } catch (error) {
    if (error) console.log(`Error: ${error}`);
  }
};

const getUser = async () => {
  const token = await keytar.getPassword("doocli", "token");
  const userId = await keytar.getPassword("doocli", "userId");

  // console.log(await keytar.findCredentials("doocli"))

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:4000/api/user/${userId}`,
      config
    );

    return res.data;
  } catch (error) {
    if (error) console.log(`Error: ${error}`);
  }
};

const getWorkplaces = async () => {
  const user = await getUser();
  user.workplacesIds.forEach(wp => console.log(wp.name))
  
}

module.exports = { registerUser, loginUser, getUser, getWorkplaces };
