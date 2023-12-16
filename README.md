## Cross-Chain Communication Dapp with xCall 


This Solidity smart contract facilitates cross-chain communication between Sepolia (Ethereum) and Binance Smart Chain (BSC) Testnet using [xCall](https://www.xcall.dev/what-is-xcall). It includes interfaces for interoperability, an initialization function, and methods to handle and send cross-chain messages.

# ICallService Interface

The first function in YourContract.sol implements the ICallService interface to enhance interoperability between contracts.

```solidity
interface ICallService {
  function sendCallMessage(
    string memory _to,
    bytes memory _data,
    bytes memory _rxollback
  ) external payable returns (uint256);
}

```

# Initialization

The initialize function is called on both the source and destination contracts. It is invoked with the destination address and the default xCall contract address on both chains. To see a list of supported chains see [here](https://github.com/icon-project/xcall-scaffolding)

```solidity
function initialize(
    address _xcallContractAddress,
    string calldata _destinationAddress) external payable {
    xcallContractAddress = _xcallContractAddress;
    destinationAddress = _destinationAddress;
  }

```


# Cross-Chain Messaging

The handleCallMessage function is called on the destination chain to properly receive the cross-chain message.

```solidity
function handleCallMessage(
      string calldata _from,
      bytes calldata _data
  ) external payable {

    if (msg.sender != xcallContractAddress) {
      revert("InvalidSender");
    }

    if (!compareTo(destinationAddress, _from)) {
      revert("InvalidFrom");
    }

    string memory msgData = string(_data);

    
    emit MessageReceived(_from, msgData);

    if (compareTo("executeRollback", msgData)) {
     
      emit RollbackDataReceived(_from, msgData);
      revert("ExecuteRollback");
    }
  }

```

# sendCallMessage Function

The sendCallMessage function is called on the source chain to send the cross-chain message.

```solidity
function sendMessage(
   bytes calldata _data,
   bytes calldata _rollback
 ) external payable returns (uint256) {
   uint256 id = ICallService(xcallContractAddress).sendCallMessage(destinationAddress, _data, _rollback);
   return id;
 }

```


# Events

The contract emits events when a message is received and the RollbackDataReceived event.

```solidity
event MessageReceived(
      string _from,
      string _msgData
  );

  
  event RollbackDataReceived(
      string _from,
      string _msgData
  );
```




## Deployed Contracts

[Sepolia DApp](https://sepolia.etherscan.io/address/0x533378eCb7384d70d97e6A68C02137F894c3aa47)

[Bsc DApp](https://testnet.bscscan.com/address/0xa140c305EA4F9F9b962354FE54e6D4C0417912D5)


## Additional Cross-Chain Interoperability Protocol (Layer Zero)

Check out another cross-chain interoperability protocol layer zero codebase, designed to enhance decentralized communication between different blockchain networks. This protocol complements the functionality provided by xCall in this repository.

[Link to Layer Zero Codebase](https://github.com/KoxyG/CrossChainLayerZero)

Feel free to explore and compare the features of both implementations for a more comprehensive understanding of cross-chain interoperability.

[Link to technical post on medium](https://medium.com/@devkoxy/bridging-blockchains-exploring-the-capabilities-of-xcall-and-layerzero-in-cross-chain-0be597f39acd)

[Link to video Demo](https://www.youtube.com/watch?v=WHQEVfH6jsc)
