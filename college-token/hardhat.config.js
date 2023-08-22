require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  gas: 2100000,
  gasPrice: 8000000000,
  allowUnlimitedContractSize: true,
  networks:{

    Sepolia:{
      url:process.env.INFURA_SEPOLIA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }

  }
};
