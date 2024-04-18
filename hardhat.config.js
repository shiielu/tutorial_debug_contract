require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const apiKey = process.env.ALCHEMY_API_KEY
const privateKey = process.env.ACCOUNT_PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
      accounts: [privateKey]
    }
  }
};
