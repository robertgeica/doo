const { registerUser, loginUser, getUser, logoutUser } = require("../api/auth");
const { userAccountInfo } = require("../ui/user");

const registerUserCmd = {
  command: "register",
  describe: "register user",

  async handler(argv) {
    registerUser(argv._[1], argv._[2]);
  },
};

const loginUserCmd = {
  command: "login",
  describe: "login user",

  async handler(argv) {
    loginUser(argv._[1], argv._[2]);
  },
};

const logoutUserCmd = {
  command: "logout",
  describe: "logout user",

  async handler() {
    logoutUser();
  },
};

const connectedUserCmd = {
  command: "user",
  describe: "user",

  async handler() {
    const user = await getUser();
    userAccountInfo(user);
  },
};

module.exports = {
  registerUserCmd,
  loginUserCmd,
  logoutUserCmd,
  connectedUserCmd,
};
