// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract tokenTOLL is ERC20 {
    address public admin;

    constructor ()  ERC20("HEALTH","HELL"){
           _mint(msg.sender,100000000*10**18);
           admin = msg.sender;
       }

    function mint (address to , uint amount) external {
        require(msg.sender == admin,"Only for owner");
        _mint(to,amount);
    }

    function burn ( uint amount ) external{
        _burn(msg.sender , amount);
    }
}

