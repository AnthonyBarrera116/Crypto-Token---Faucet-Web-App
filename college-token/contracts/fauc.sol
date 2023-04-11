// contracts/Faucet.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// interface for ERC20 
interface IERC20 {

    // transfer ammount to account from faucet
    function transfer(address to, uint256 amount) external returns (bool);

    // Balance of account
    function balanceOf(address account) external view returns (uint256);

    // transfer from faucet to address
    event Transfer(address indexed from, address indexed to, uint256 value);
}


// faucet contract
contract Faucet {

    // Contract owner
    address payable owner;

    // Token interface which is for faucet
    IERC20 public token;

    // Withdrawl amount 50 
    uint256 public withdrawalAmount = 50 * (10**18);
    
    // Lock address for 1 minute and can mint again
    uint256 public lockTime = 1 minutes;

    // withdrawl to account
    event Withdrawal(address indexed to, uint256 indexed amount);
    
    // Depositing from account
    event Deposit(address indexed from, uint256 indexed amount);

    // For access time next time you can accesss
    mapping(address => uint256) nextAccessTime;

    // payable costruter hold address and IERC20 token address 
    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    // When person requests token from website 
    function requestTokens() public {
        
        // address id not the same 
        require(
            msg.sender != address(0),
            "Request must not originate from a zero account"
        );

        // checking for insufficent funds for gas
        require(
            token.balanceOf(address(this)) >= withdrawalAmount,
            "Insufficient balance in faucet for withdrawal request"
        );

        // Time break
        require(
            block.timestamp >= nextAccessTime[msg.sender],
            "Insufficient time elapsed since last withdrawal - try again later."
        );
        
        // Writes time if msg sender in map
        nextAccessTime[msg.sender] = block.timestamp + lockTime;

        // Transfers tokens
        token.transfer(msg.sender, withdrawalAmount);
    }

    // recieve for contract account that holds all needs to send tokens to facuet
    receive() external payable {

        emit Deposit(msg.sender, msg.value);

    }

    // Withdrawl amount set if want to change
    function setWithdrawalAmount(uint256 amount) public onlyOwner {

        withdrawalAmount = amount * (10**18);

    }

    // chnage lock time
    function setLockTime(uint256 amount) public onlyOwner {

        lockTime = amount * 1 minutes;

    }

    // withdrawl is vaild for owner
    function withdraw() external onlyOwner {

        emit Withdrawal(msg.sender, token.balanceOf(address(this)));
        
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    // Modifier owner
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }
}