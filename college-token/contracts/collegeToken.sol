// contracts/collegeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Import of openZepplion
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Contract Creation for College Token with ERC20 node modules
contract CollegeToken is ERC20Capped,ERC20Burnable{

    // Owner of contract
    address payable public owner;

    // Block Reware in this case doesn't work since it is on test net
    uint256 public blockReward;

    // Mint the owner of the contract the max copacity of the token
    constructor (uint cap, uint256 reward) ERC20("CollegeToken","CT") ERC20Capped(cap * (10 ** 18)){

        // Making owner payable
        owner = payable(msg.sender);

        // minting
        _mint(owner, 70000000 * (10 ** 18));
        
        // Blcok reward is the reward of the decimals of value
        blockReward =  reward * (10 * 18);

    }

    // Minting coins 
    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        
        // making sure there is a capped ERC20 of ERC20 Cap
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");

        // Mints ammount to owner
        super._mint(account, amount);
    }

    // Mint reward to Miner
    function _mintMinerReward() internal{

        // Miner and coin mint
        _mint(block.coinbase, blockReward);

    }

    // Before transfering coin to address making sure address is are vaild 
    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override{

        if (from != address(0) && to != block.coinbase && block.coinbase != address(0)){

            // mint reward to miner
            _mintMinerReward();

        }
        super._beforeTokenTransfer(from, to, value);

    }


    // Set block reward
    function setBlockReward(uint256 reward) public onlyOwner{
        
        // block reward
        blockReward = reward * (10 * 18);

    }

    // never used but found out it's good practice if needed to 
    function destroy() public onlyOwner{

        // Self destructs contract
        selfdestruct(owner);

    }

    // only owner modfier 
    modifier onlyOwner{

        require(msg.sender == owner, "Only Owner can change reward");
        _;

    }

}