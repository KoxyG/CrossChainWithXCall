// handleMessage.js
async function main() {
     const [deployer] = await ethers.getSigners();

     console.log("Handling message with the account:", deployer.address);

     // Replace this with the actual address of the deployed xCallETH contract
     const xCallBSCAddress = "0x5dd79Adcf4CBA8ed389CC996129719FF8e738D04";

     // Replace this with the actual "from" and "data" values
     const from = "0x8E302b2fD7C10A0033e48EB0602Db3C7d6E0F506	";
    

     const dataHexString = "48656c6c6f204b6f78792c2066726f6d205863616c6c";
     const data = Buffer.from(dataHexString, "hex");
   
     // Connect to the deployed xCallETH contract
     const xCallETH = await ethers.getContractAt("xCallBSC", xCallBSCAddress);

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
