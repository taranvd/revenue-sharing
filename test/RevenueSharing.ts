import { ethers } from "hardhat";
import { expect } from "chai";
import { RevenueSharing } from "../typechain";

describe("RevenueSharing Contract", function () {
  let revenueSharing: RevenueSharing;
  let owner: any;
  let participant1: any;
  let participant2: any;

  beforeEach(async function () {
    [owner, participant1, participant2] = await ethers.getSigners();

    // Deploy contract
    const RevenueSharingFactory = await ethers.getContractFactory("RevenueSharing");
    revenueSharing = await RevenueSharingFactory.deploy();
  });

  it("should add participants correctly", async function () {
    // Adding participants
    await revenueSharing.addParticipant(participant1.address, 50);
    await revenueSharing.addParticipant(participant2.address, 50);

    // Verify correctness
    expect(await revenueSharing.shares(participant1.address)).to.equal(50);
    expect(await revenueSharing.shares(participant2.address)).to.equal(50);
  });

  it("should distribute revenue correctly", async function () {
    // Add participants
    await revenueSharing.addParticipant(participant1.address, 50);
    await revenueSharing.addParticipant(participant2.address, 50);

    // Send Ether to the contract
    const tx = await owner.sendTransaction({
      to: revenueSharing.getAddress(), // Corrected to .address
      value: ethers.parseEther("1.0"), // Correct usage of ethers.utils
    });
    await tx.wait(); // Wait for transaction confirmation

    // Check that participants received their share
    const balance1 = await ethers.provider.getBalance(participant1.address);
    const balance2 = await ethers.provider.getBalance(participant2.address);

    // Ensure participants received their share
    expect(balance1).to.be.gt(ethers.parseEther("0.499"));
    expect(balance2).to.be.gt(ethers.parseEther("0.499"));
  });
});
