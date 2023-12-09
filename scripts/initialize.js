async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Initializing contracts with the account:", deployer.address);

  // Replace these with the actual contract addresses on the target network
  const xCallETHAddress = "0x533378eCb7384d70d97e6A68C02137F894c3aa47";
  const xCallBSCAddress = "0xa140c305EA4F9F9b962354FE54e6D4C0417912D5";

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
