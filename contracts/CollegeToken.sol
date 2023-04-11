// contracts/collegeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CollegeToken is ERC20Capped,ERC20Burnable{

    address payable public owner;

    uint256 public blockReward;

    // decimals()
    constructor (uint cap, uint256 reward) ERC20("CollegeToken","CT") ERC20Capped(cap * (10 ** 18)){

        owner = payable(msg.sender);
        _mint(owner, 70000000 * (10 ** 18));
        blockReward =  reward * (10 * 18);

    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function _mintMinerReward() internal{

        _mint(block.coinbase, blockReward);

    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override{

        if (from != address(0) && to != block.coinbase && block.coinbase != address(0)){

            
            _mintMinerReward();

        }
        super._beforeTokenTransfer(from, to, value);

    }

    function setBlockReward(uint256 reward) public onlyOwner{
        
        blockReward = reward * (10 * 18);

    }

    function destroy() public onlyOwner{

        selfdestruct(owner);

    }

    modifier onlyOwner{

        require(msg.sender == owner, "Only Owner can change reward");
        _;

    }

}