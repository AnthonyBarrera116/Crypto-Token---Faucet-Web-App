// hardhat
const hre = require("hardhat");

// async function for deploying Faucet
async function main() {

  // deploy contract facuet from owner who holds all coin
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy("0x2f0c8Da871290aaC6b26E44E0Ba952f562F5d1Bc");

  await faucet.deployed();

  console.log("Facuet contract deployed: ", faucet.address);
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});