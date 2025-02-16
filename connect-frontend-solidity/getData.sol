// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract getData {
    uint num;

    function getNum() public view returns (uint256) {
        return num;
    }

    function changeNum(uint256 _newNum) public returns (uint256) {
        num = _newNum;
        return num;
    }

    
}