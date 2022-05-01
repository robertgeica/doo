const chalk = require("chalk");
const keytar = require("keytar");
const { error, success, normal, pending } = require('./colors');


const userAccountInfo = async (user) => {
  const isConnectedUser = await checkConnectedUser();
  if (!isConnectedUser) {
    return ;
  }
  console.log(chalk.hex(normal)(`Hi! You are logged in with ${user.email}.`));

  const isVerifiedAccount = user.isVerifiedEmail === true ? true : false;
  const pendingVerification = user.emailVerificationToken.length > 0 ? true : false;

  const verifiedLog = chalk.hex(success)(`Your account has been verified!`);
  const pendingLog = chalk.hex(pending)(`Your account verification is pending. Check your email!`);
  const notVerifiedLog = chalk.hex(error)(`Your account hasn't been verified yet!`);
  
  const output = isVerifiedAccount ? verifiedLog :
  pendingVerification ? pendingLog : notVerifiedLog;

  console.log(output)
};

const checkConnectedUser = async () => {
  const token = await keytar.getPassword("doocli", "token");
  
  if(!token) {
    console.log(chalk.hex(error)(`Please login first!`));
    return false;
  }
  return true;
}
module.exports = { userAccountInfo, checkConnectedUser };
