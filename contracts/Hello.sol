// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2 <0.9.0;

contract Hello {
    uint256 response = 0;
    function hello(string memory word) public returns (uint256) {
        require(
            keccak256(abi.encodePacked(word)) ==
                keccak256(abi.encodePacked("hello")),
            "word is not 'hello'"
        );
        response = 1;
        return response;
    }
}
