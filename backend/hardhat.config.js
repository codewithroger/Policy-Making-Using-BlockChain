/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config(); // For environment variables


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.19",
   defaultNetwork: "volta",
   networks: {
      hardhat: {},
      volta: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 3000000,
         gasPrice: 5000000000,
      }
   },
}