//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transaction {
    event Transfer(
        address sender,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    function publicTransaction(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }
}
