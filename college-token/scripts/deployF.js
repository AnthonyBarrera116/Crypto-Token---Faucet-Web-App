// hardhat
const hre = require("hardhat");

// async function for deploying Faucet
async function main() {

  // deploy contract facuet from owner who holds all coin
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy("0x44252F68943889AD5aAD9B0bF7ADcF5F25f4E4D5");

  await faucet.deployed();

  console.log("Facuet contract deployed: ", faucet.address);
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});