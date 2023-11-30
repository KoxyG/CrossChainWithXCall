// handleMessage.js
async function main() {
     const [deployer] = await ethers.getSigners();
   
     console.log("Handling message with the account:", deployer.address);
   
     // Replace this with the actual address of the deployed xCallETH contract
     const xCallETHAddress = "0xYourXCallEthContractAddress";
   
     // Replace this with the actual "from" and "data" values
     const from = "0xSourceChainAddress";
     const data = "0xYourMessageDataHexValue";
   
     // Connect to the deployed xCallETH contract
     const xCallETH = await ethers.getContractAt("xCallETH", xCallETHAddress);
   
     // Call the handleCallMessage function
     const handleCallMessageTx = await xCallETH.handleCallMessage(from, data);
   
     // Wait for the transaction to be mined
     await handleCallMessageTx.wait();
   
     console.log("Message handled successfully!");
   }
   
   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   