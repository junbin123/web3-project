const hre = require("hardhat");

async function main() {
  const transactionFactory  = await hre.ethers.getContractFactory("Transaction");
  const transactionContract = await transactionFactory.deploy();
  await transactionContract.deployed();
  console.log("transactionContract 合约已部署到ropsten网络:", transactionContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
