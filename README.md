# Download the repo as zip and upload files to a new repo
  * download files and drag them into a new repo
  * go to visual studio 
  * click the branch icon
  * Click clone repository
  * when doen open terminal
  * git init
  * git remote add origin git@github.com:"UserName"/"Project name".git

  
# Coin-token
  * cd into college-token
  * npm install
  * create .env 
    * PRIVATE_KEY =
      * make private key the private key of a wallet made in metamask
    * INFURA_RINKEBY_ENDPOINT= 
      * make the endpoint on this website https://app.infura.io/login
        * create account
        * create new api key
        * web3 api and name it
        * click it and find endpoints
        * change mainnet to sepolia
        * add it to .env
  * npx hardhat run --network Sepolia scripts/deploy.js - makes contract
    * take this address made in terminal and change the contract address in deployF.sol 
      * const faucet = await Faucet.deploy("ADDRESS");
  * npx hardhat run --network Sepolia scripts/deployF.js - makes Faucet contract
# MetaMask
  * Take the contract address the one you first created with the deploy.js
  * go to import tokens and paste the address of the token contract into token contract
  * do the same for a second account
# add to faucet
  * With the account that has all the coin send coin to the fauct contract when you did deployF.js

# Lanuching website
  * make sure you are not in the college-token Directory
  * in Src/App. change lines 33 and 56 to the contract address of the faucet
  * In utils change Faucet.json with the abi in the collge-token/artifacts/contracts/fauc.sol/faucet.sol
  * npm install
  * npm run deploy
# Github will have Enviroments
  * Click enviroments and click veiw page
  * Will bring up faucet
  
Sepolia faucet: https://sepoliafaucet.com/

TestNet contract look up: https://sepolia.etherscan.io/

https://sepolia.etherscan.io/token/0xfA96a0A682d26212D3911bFf13f001626679cD9D 0xfA96a0A682d26212D3911bFf13f001626679cD9D- Contract Deployed

https://sepolia.etherscan.io/token/0xfa96a0a682d26212d3911bff13f001626679cd9d?a=0xC2ffc2F6E316CE12eA7ED2A4ce666171A312895d 0xC2ffc2F6E316CE12eA7ED2A4ce666171A312895d - Faucet

API web: https://app.infura.io/
