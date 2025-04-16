# Download the repo as zip and upload files to a new repo
  * download files and drag them into a new repo
  * go to visual studio 
  * click the branch icon
  * Click clone repository
  * when doen open terminal
  * git init
  * git remote add origin git@github.com:"UserName"/"Project name".git

# College-Token Folder
    * cd College-Token
    * npm install
    * Create .env
        * PRIVATE_KEY = "(YOUR METEMASK PRIVATE KEY)""
        * INFURA_SEPOLIA_ENDPOINT = "(WEB 3 API )"

    * FOR INFURA_SEPOLIA_ENDPOINT
        * Go to this website: https://app.infura.io/login (MAKE ACCOUNT OR LOGIN)
        * Create New API KEY
        * Web3 api and name it
        * Click endpoints
        * change mainnet to sepolia 
        * add to .env INFURA_SEPOLIA_ENDPOINT= ""

    * (NOTE YOU MUST HAVE TESTNET IN YOUR WALLET SEPOLIA)
    * npx hardhat run --network Sepolia scripts/deploy.js
        * TAKE ADDRESS AND PASTE IT IN deployF.js on line 9
           * const faucet = await Faucet.deploy("ADDRESS");

    * npx hardhat run --network Sepolia scripts/deployF.js

# METAMASK
    * When deploy.js is done take address from deploy.js
    * import token in metamask and paste address
    * (NOTE: IF YOU WANT TOKENS TO APPEAR ON ANOTHER WALLET YOU MUST FOLLOW SAME STEPS ABOVE)

# LANUCH WEBSITE
    * cd back to beginning of folder 
    * in src/App lines 44 and 87 change the address to faucet address
    * In src/utils change Faucet.json with the abi in the collge-token/artifacts/contracts/fauc.sol/Faucet.json
    * npm install
    * npm run deploy
    * (IF YOU GET AUTHOR IDENTITY UNKNOWN FOLLOW THE COMMANDS)
        * git config --global user.email "you@example.com"
        * git config --global user.name "Your Name"
        * RE-RUN npm run deploy

# WHEN LAUCHED
    * When launched got to github pages on the side 
    * it will bring you to your website
    * top right connect metamask wallet with test account (YOU MUST HAVE SEPOLIA TESTNET IN WALLET JUST TRANSFER SEPOLIA TESTNET FROM 1st WALLET FROM CONTRACT DEPLOY)
    * Make sure your address is correct and click get tokens
    * check wallet and you can send to anyone


# Github will have Enviroments
  * Click enviroments and click veiw page
  * Will bring up faucet
  
Sepolia faucet: https://sepoliafaucet.com/

TestNet contract look up: https://sepolia.etherscan.io/

https://sepolia.etherscan.io/token/0x5343fE556880114f2F849e14C934B46508F8f254 0x5343fE556880114f2F849e14C934B46508F8f254- Contract Deployed

https://sepolia.etherscan.io/token/0xBAF9db9df4e33C28B665f4F4f47536894Ff1E55e
0xBAF9db9df4e33C28B665f4F4f47536894Ff1E55e - Faucet

API web: https://app.infura.io/

faucet page: https://anthonybarrera116.github.io/Crypto-Token---Faucet-Web-App/
