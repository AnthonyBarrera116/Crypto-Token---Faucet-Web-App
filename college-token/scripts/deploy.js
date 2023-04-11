// hardhat
const hre = require("hardhat");

// async function for deploying cotract coins
async function main() {

  // deploy contract
  const CToken = await hre.ethers.getContractFactory("CollegeToken");
  const collToken = await CToken.deploy(100000000, 50);

  await collToken.deployed();

  console.log("College Token deployed: ", collToken.address);
  
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
