#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const keytar = require("keytar");

// register user
yargs.command({
  command: "register",
  describe: "register user",

  async handler(argv) {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({
      email: argv._[1],
      password: argv._[2],
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
  },
});

yargs.parse();
