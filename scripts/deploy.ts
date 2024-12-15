import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const RevenueSharingFactory = await ethers.getContractFactory("RevenueSharing");

  const revenueSharing = await RevenueSharingFactory.deploy();

  await revenueSharing.waitForDeployment();

  console.log("RevenueSharing contract deployed to:", await revenueSharing.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
