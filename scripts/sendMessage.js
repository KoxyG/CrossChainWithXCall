// sendMessage.js
async function main() {
     const [deployer] = await ethers.getSigners();
   
     console.log("Sending message with the account:", deployer.address);
   
     // Replace this with the actual address of the deployed xCallETH contract
     const xCallETHAddress = "0xYourXCallEthContractAddress";
   
     // Replace this with the actual data and rollback values
     const data = "0xYourDataHexValue";
     const rollback = "0xYourRollbackHexValue";
   
     // Connect to the deployed xCallETH contract
     const xCallETH = await ethers.getContractAt("xCallETH", xCallETHAddress);
   
     // Call the sendMessage function
     const sendMessageTx = await xCallETH.sendMessage(data, rollback);
   
     // Wait for the transaction to be mined
     await sendMessageTx.wait();
   
     console.log("Message sent successfully!");
   }
   
   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });
   