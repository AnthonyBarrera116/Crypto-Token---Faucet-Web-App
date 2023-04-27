// hardhat
const hre = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { rand } = require("elliptic");
// async function for deploying cotract coins
async function main() {

    const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
    this.leafNodes = [owner, randomPerson, randomPerson2]
  // deploy contract
  this.merkleTree = new MerkleTree(this.leafNodes, keccak256, { sortPairs: true });
    // Get root hash from merkle tree
const rootHash = this.merkleTree.getRoot()
  const airdrop = await hre.ethers.getContractFactory("AirDrop");
  const ad = await airdrop.deploy(rootHash, 5);

  await ad.deployed();

  console.log("Airdrop deployed: ", ad.address);
  
}

// If Error occurs in main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
