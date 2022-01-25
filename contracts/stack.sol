//SPDX-License-Identifier: MIT
 pragma solidity ^0.8.0;

 import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
 import "hardhat/console.sol";

  contract Staking {
    IERC20 public tokenTOLL;

    //varibles
    uint256 public totalstakeToken;
    uint256 public S;

    address owner;

    //mapping
    mapping(address => uint256) public s1;
    mapping(address => uint256) public stake;
    mapping(address => uint256) public previousReward;
    
     constructor(address token){
         tokenTOLL = IERC20(token);
         owner = msg.sender  ;
     }

     function deposit (uint amount) public {
        require(amount >0, 'Staking: amount should not be less than or equal to 0');
        if(stake[msg.sender] != 0){
            previousReward[msg.sender] = previousReward[msg.sender] + (stake[msg.sender] * (S - s1[msg.sender]))/ 10 ** 18;
        }
        stake[msg.sender] += amount;
        totalstakeToken += amount;
        tokenTOLL.transferFrom(msg.sender, address(this),amount);
        s1[msg.sender] = S;
     }

     function withdrawReward () public returns(uint){
         uint amount = previousReward[msg.sender] + (stake[msg.sender] * (S - s1[msg.sender]))/ 10 ** 18;
         require(amount > 0);
         tokenTOLL.transfer(msg.sender,amount);
         return(amount);

     }
     
     function unstake(uint amount) public {
        require(amount >0, 'Staking: amount should not be less than or equal to 0');
        require(amount <= stake[msg.sender]);
        previousReward[msg.sender] = previousReward[msg.sender] + (stake[msg.sender] * (S - s1[msg.sender]))/ 10 ** 18;
        stake[msg.sender] -= amount;
        totalstakeToken -= amount;
        tokenTOLL.transfer(msg.sender,amount);
        s1[msg.sender] = S;
     }

     function rewardIsuue(uint256 Ramount) public returns(uint256){
        require(msg.sender == owner ,"ownership issue");
        tokenTOLL.transferFrom(msg.sender, address(this),Ramount);
        S += (Ramount * 10 ** 18)/totalstakeToken;
        return(Ramount);
    }    

 }
