require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{

    Sepolia:{

      url:"https://sepolia.infura.io/v3/7f92953cd5984b78adf765cb736e1857",
      accounts: ["01549f9e71c4ff998da1c044e3c173dc46ae401894bb55a505acbb01d5676451"]

    }

  }
};
