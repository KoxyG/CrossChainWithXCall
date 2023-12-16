// sendMessage.js
async function main() {
     const [deployer] = await ethers.getSigners();

     console.log("Sending message with the account:", deployer.address);

     // Replace this with the actual address of the deployed xCallETH contract
     const xCallETHAddress = "0x08a58F517B90C5e6d4E612cdCFAf15d8268a647C";

     const dataHexString = "48656c6c6f204b6f78792c2066726f6d205863616c6c";
     const data = Buffer.from(dataHexString, "hex");
     const rollbackHexString = "6572726f72207768696c652073656e64696e6720686578436f646564206d657373616765s";
     const rollback = Buffer.from(rollbackHexString, "hex");
     // Connect to the deployed xCallETH contract
     const xCallETH = await ethers.getContractAt("xCallETH", xCallETHAddress);

     // Call the sendMessage function
     const sendMessageTx = await xCallETH.sendMessage(data, rollback, { gasLimit: 300000 });



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

