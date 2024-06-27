# MetaCrafterModule3Assessment2

**Setting Up and Using Your Smart Contract Front-end**

**Overview**

Follow these steps to interact with your SmartContract_with_Front_end_interaction smart contract through a web interface.


**Environment Setup**

1. Clone the repository or download and extract the ZIP file.
2. Place Files
   
      [a]Copy index.js to the pages folder.

      [b]Copy deploy.js to the scripts folder.
  
3. Install MetaMask
  Ensure the MetaMask browser extension is installed.


**Project Initialization**
1. Open three terminals and run the following commands in each

    (a) npm i
     Start Local Ethereum Network

    (b) npx hardhat node
     Deploy Smart Contract
   
    (c) npx hardhat run --network localhost scripts/deploy.js
      Verify the deployment address in index.js.


   
**Launch Frontend**

In the first terminal, run:
npm run dev
Open http://localhost:3000/




**Configure MetaMask**

1) Add Local Network
In MetaMask, go to network settings, click "Add a Network," and enter:
RPC URL
Chain ID
Currency Symbol
Enter this detaisl with respect to the metamask data.

2) Import Account
From the terminal running npx hardhat node, copy a private key.
Import the account in MetaMask.


**Interaction**

Visit http://localhost:3000/ to interact with your smart contract via MetaMask.
Monitor transaction details in the deployment terminal.


**HELP**

If you have any issues, please contact the author.

**Author**

Riya Battu - riyabattu84955@gmail.com
