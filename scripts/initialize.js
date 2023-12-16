async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Initializing contracts with the account:", deployer.address);

  // Replace these with the actual contract addresses on the target network
  const xCallETHAddress = "0x699EcC0C83c88AB24ad1c252e608Dd84Bb18Fe70";
  const xCallBSCAddress = "0x83231d620894016abA2164411f7b96a3fDb7f41A";

  // Initialize xCallETH contract
  if (network.name === "sepolia") {
    const xCallETH = await ethers.getContractAt("xCallETH", xCallETHAddress);
    const xCallETHInitTx = await xCallETH.initialize(
      xCallBSCAddress,
      "0xC938B1B7C20D080Ca3B67eebBfb66a75Fb3C4995"
    );
    await xCallETHInitTx.wait();
    console.log("xCallETH initialized");
  }

  // Initialize xCallBSC contract
  if (network.name === "bscTestnet") {
    const xCallBSC = await ethers.getContractAt("xCallBSC", xCallBSCAddress);
    const xCallBSCInitTx = await xCallBSC.initialize(
      xCallETHAddress,
      "0x8E302b2fD7C10A0033e48EB0602Db3C7d6E0F506"
    );

    await xCallBSCInitTx.wait();
    console.log("xCallBSC initialized");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
