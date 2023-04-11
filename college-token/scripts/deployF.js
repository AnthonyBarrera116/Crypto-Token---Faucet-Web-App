// hardhat
const hre = require("hardhat");

// async function for deploying Faucet
async function main() {

  // deploy contract facuet from owner who holds all coin
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy("0xA4fD5A593003Eaf15dc510FE7a08499A879F05f4");

  await faucet.deployed();

  console.log("Facuet contract deployed: ", faucet.address);
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});