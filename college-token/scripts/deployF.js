// hardhat
const hre = require("hardhat");

// async function for deploying Faucet
async function main() {

  // deploy contract facuet from owner who holds all coin
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy("0x68dD4c2D044c111e27616619bb101A27cA6c2780");

  await faucet.deployed();

  console.log("Facuet contract deployed: ", faucet.address);
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});