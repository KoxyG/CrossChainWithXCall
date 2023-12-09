const { ethers } = require('hardhat');


async function main() {
  const [deployer] = await ethers.getSigners();
  


  if (network.name === "sepolia") {
   
    const xCallETH = await ethers.getContractFactory("xCallETH");
    const xCallEthContract = await xCallETH.deploy();

    await xCallEthContract.deployed();
    console.log("xCallETH deployed to:", xCallEthContract.address);

  }

  if (network.name === "bscTestnet") {

    const xCallBSC = await ethers.getContractFactory("xCallBSC");
    const xCallBSCContract = await xCallBSC.deploy();


    await xCallBSCContract.deployed();
    const BSC_ADDRESS = xCallBSCContract.address;
    console.log("BSC_ADDRESS", BSC_ADDRESS);
    console.log("xCallBSC deployed to:", xCallBSCContract.address);

  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
