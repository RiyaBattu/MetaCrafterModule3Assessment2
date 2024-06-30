const hre = require("hardhat");

async function main() {
  const initialBalance = 1;
  const ContractFactory = await hre.ethers.getContractFactory("SmartContractWithFrontendInteraction");
  const contract = await ContractFactory.deploy(initialBalance);
  await contract.deployed();

  contract.displayAddress();

  console.log(`A contract with balance of ${initialBalance} eth deployed to ${contract.address}`);

  contract.on("ShowAddress", (owner) => {
    console.log(`msg.sender is : ${owner}`);
  });

  contract.on("Deposit", (depositValue, balance) => {
    console.log(`New deposit: ${depositValue} new balance is : ${balance} ETH`);
  });

  contract.on("Withdraw", (withdrawValue, balance) => {
    console.log(`New withdraw: ${withdrawValue} new balance is : ${balance} ETH`);
  });

  // Redeem function
  contract.on("Redeem", (amount) => {
    console.log(`Redeemed amount: ${amount} ETH`);
  });

  // Call the "redeem" function
  await contract.redeem();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
