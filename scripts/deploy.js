const { ethers } = require('hardhat');


async function main() {
  const [deployer] = await ethers.getSigners();


  if (network.name === "sepolia") {
    // Deploy xCallETH contract
    const xCallETH = await ethers.getContractFactory("xCallETH");
    const xCallEthContract = await xCallETH.deploy();

    await xCallEthContract.deployed();
    console.log("xCallETH deployed to:", xCallEthContract.address);

    // // Initialize xCallETH contract for sepolia network
    // const xCallETHInitTx = await xCallEthContract.initialize(
    //   xCallBSCContract.address,
    //   "YOUR_DESTINATION_ADDRESS_SEPOLIA"
    // );

    // await xCallETHInitTx.wait();
    // console.log("xCallETH initialized for sepolia network");
  }

  if (network.name === "bscTestnet") {

    // Deploy xCallETH contract
    const xCallBSC = await ethers.getContractFactory("xCallBSC");
    const xCallBSCContract = await xCallBSC.deploy();


    await xCallBSCContract.deployed();
    console.log("xCallBSC deployed to:", xCallBSCContract.address);

    // // Initialize xCallBSC contract for bscTestnet network
    // const xCallBSCInitTx = await xCallBSCContract.initialize(
    //   xCallEthContract.address,
    //   "YOUR_DESTINATION_ADDRESS_BSC_TESTNET"
    // );

    // await xCallBSCInitTx.wait();
    // console.log("xCallBSC initialized for bscTestnet network");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
