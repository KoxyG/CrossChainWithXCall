// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;


interface ICallService {
  function sendCallMessage(
    string memory _to,
    bytes memory _data,
    bytes memory _rollback
  ) external payable returns (uint256);
}


contract xCallETH {
  address private xcallContractAddress;
  string private destinationAddress;


  function initialize(
    address _xcallContractAddress,
    string calldata _destinationAddress) external payable {
    xcallContractAddress = _xcallContractAddress;
    destinationAddress = _destinationAddress;
  }

  
 function sendMessage(
   bytes calldata _data,
   bytes calldata _rollback
 ) external payable returns (uint256) {
   uint256 id = ICallService(xcallContractAddress).sendCallMessage(destinationAddress, _data, _rollback);
   return id;
 }

  
  function compareTo(
      string memory _base,
      string memory _value
  ) internal pure returns (bool) {
      if (
          keccak256(abi.encodePacked(_base)) ==
          keccak256(abi.encodePacked(_value))
      ) {
          return true;
      }
      return false;
  }

  
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

  event MessageReceived(
      string _from,
      string _msgData
  );

  event RollbackDataReceived(
      string _from,
      string _msgData
  );
}