import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { mineBlocks, expandTo18Decimals } from "./utilities/utilities";
import { 
  TokenTOLL__factory,
  TokenTOLL,
  Staking__factory,
  Staking
 } from "../typechain";


 describe("stacking", async()=>{
    let token : TokenTOLL;
    let stake : Staking;
    let owner: SignerWithAddress;
    let s1: SignerWithAddress;
    let s2: SignerWithAddress;
    let s3: SignerWithAddress;
    let s4: SignerWithAddress;
    let s5: SignerWithAddress;
    let s6: SignerWithAddress;
    let s7: SignerWithAddress;
    let s8: SignerWithAddress;
    let signers: SignerWithAddress[];

    beforeEach( async()=>{
      signers = await ethers.getSigners();
      owner = signers[0];
       s1= signers[1];
       s2= signers[2];
       s3= signers[3];
       s4= signers[4];
       s5= signers[5];
       s6= signers[6];
       s7= signers[7];
       s8= signers[8];
      
       token = await new TokenTOLL__factory(owner).deploy();
       stake = await new Staking__factory(owner).deploy(token.address);
    });

    //deploy the token
      it("just deploy check",async()=>{
        console.log(token.address ,"this is token addres");
        console.log(stake.address ,"this is a stack contract address");
      })

    //this is stacking 
      it("stacking is happening",async()=>{
        await token.connect(owner).transfer(s2.address,expandTo18Decimals(88));
        console.log(await token.balanceOf(s2.address));
        await token.connect(s2).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        const stackBYs2 = await stake.stake(s2.address);
        console.log(stackBYs2,"this is the stack by s2");
        expect(Number(stackBYs2)).to.equal(Number(expandTo18Decimals(22)));
      })

      //this is reward distribution
      it("stacking is happening",async()=>{
        await token.connect(owner).transfer(s2.address,expandTo18Decimals(88));
        await token.connect(s2).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        const stackBYs2 = await stake.stake(s2.address);
        console.log(stackBYs2,"this is the stack by s2");
        const pendingBalances2 = await token.balanceOf(s2.address);
        console.log(pendingBalances2,"this is the pending balance of s2");
        //3
        await token.connect(owner).transfer(s3.address,expandTo18Decimals(88));
        console.log(await token.balanceOf(s3.address));
        await token.connect(s3).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s3).deposit(expandTo18Decimals(44));
        const stackBYs3 = await stake.stake(s3.address);
        console.log(stackBYs3,"this is the stack by s3");
        //reward
        await token.connect(owner).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(owner).rewardIsuue(expandTo18Decimals(20));
        console.log(await stake.S());
        //withdraw reward
        await stake.connect(s2).withdrawReward();
        const rewardGet =await token.balanceOf(s2.address);
        console.log(rewardGet, "this is the reward get by  the s2");

        expect(Number(rewardGet)).to.greaterThan(Number(pendingBalances2));
      })

      //this is reward distribution many time
      it("stacking is happening",async()=>{
        await token.connect(owner).transfer(s2.address,expandTo18Decimals(88));
        await token.connect(s2).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        const stackBYs2 = await stake.stake(s2.address);
        console.log(stackBYs2,"this is the stack by s2");
        const pendingBalances2 = await token.balanceOf(s2.address);
        console.log(pendingBalances2,"this is the pending balance of s2");
        //3
        await token.connect(owner).transfer(s3.address,expandTo18Decimals(88));
        console.log(await token.balanceOf(s3.address));
        await token.connect(s3).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s3).deposit(expandTo18Decimals(44));
        const stackBYs3 = await stake.stake(s3.address);
        console.log(stackBYs3,"this is the stack by s3");
        //reward
        await token.connect(owner).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(owner).rewardIsuue(expandTo18Decimals(20));
        console.log(await stake.S());
        //withdraw reward
        await stake.connect(s2).withdrawReward();
        const rewardGet =await token.balanceOf(s2.address);
        console.log(rewardGet, "this is the reward get by  the s2");

        expect(Number(rewardGet)).to.greaterThan(Number(pendingBalances2));
      })     
      
      //this is multiple address 3 stacking and multiple withdraw -> 2 times reward distribution
      it("stacking is happening",async()=>{
        await token.connect(owner).transfer(s2.address,expandTo18Decimals(88));
        await token.connect(s2).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        await stake.stake(s2.address);
        //3
        await token.connect(owner).transfer(s3.address,expandTo18Decimals(88));
        await token.connect(s3).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s3).deposit(expandTo18Decimals(44));
        await stake.stake(s3.address);
        //4
        await token.connect(owner).transfer(s4.address,expandTo18Decimals(88));
        await token.connect(s4).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s4).deposit(expandTo18Decimals(11));
        await stake.stake(s4.address);
        //reward
        await token.connect(owner).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(owner).rewardIsuue(expandTo18Decimals(20));
        console.log(await stake.S());

        //again s2
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        await stake.stake(s2.address);
        //5
        await token.connect(owner).transfer(s5.address,expandTo18Decimals(88));
        await token.connect(s5).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s5).deposit(expandTo18Decimals(11));
        await stake.stake(s4.address);
        //reward 2
        await token.connect(owner).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(owner).rewardIsuue(expandTo18Decimals(20));
        console.log(await stake.S());
        //withdraw reward s2
        // await stake.connect(s2).withdrawReward();
        // const rewardGet =await token.balanceOf(s2.address);
        // console.log(rewardGet, "this is the reward get by  the s2");  
        //withdraw reward s3
        // await stake.connect(s3).withdrawReward();
        // const rewardGet3 =await token.balanceOf(s3.address);
        // console.log(rewardGet3, "this is the reward get by  the s2");   
        console.log(await stake.previousReward(s2.address),"pending reward of s4")  ;
        console.log(await stake.previousReward(s3.address),"pending reward of s4")  ;

      })

      //this is stake and unstack
      it.only("stacking is happening",async()=>{
        await token.connect(owner).transfer(s2.address,expandTo18Decimals(88));
        await token.connect(s2).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        await stake.stake(s2.address);
        //3
        await token.connect(owner).transfer(s3.address,expandTo18Decimals(88));
        await token.connect(s3).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s3).deposit(expandTo18Decimals(44));
        await stake.stake(s3.address);
        //4
        await token.connect(owner).transfer(s4.address,expandTo18Decimals(88));
        await token.connect(s4).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(s4).deposit(expandTo18Decimals(11));
        await stake.stake(s4.address);
        //reward
        await token.connect(owner).approve(stake.address,expandTo18Decimals(88));
        await stake.connect(owner).rewardIsuue(expandTo18Decimals(20));
        console.log(await stake.S());
        

        //again s2
        await stake.connect(s2).deposit(expandTo18Decimals(22));
        await stake.stake(s2.address);

        //withdraw reward s2
        await stake.connect(s2).withdrawReward();
        const rewardGet =await token.balanceOf(s2.address);
        console.log(rewardGet, "this is the reward get by  the s2");  
        //withdraw reward s3
        await stake.connect(s3).withdrawReward();
        const rewardGet3 =await token.balanceOf(s3.address);
        console.log(rewardGet3, "this is the reward get by  the s2");  
        //unstake
        await stake.connect(s2).unstake(expandTo18Decimals(44)); 
        const rewardUnstake =await token.balanceOf(s2.address);
        console.log(rewardUnstake, "this is the unstake get by  the s2");

        console.log(await stake.s1(s2.address),"pending reward of s4")  ;



        // console.log(await stake.previousReward(s2.address),"pending reward of s4")  ;
        // console.log(await stake.previousReward(s3.address),"pending reward of s4")  ;

      })      
 })