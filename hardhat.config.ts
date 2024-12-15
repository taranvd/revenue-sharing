import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.28", 
  paths: {
    artifacts: "./artifacts",
  },
  typechain: {
    outDir: "typechain", 
    target: "ethers-v6",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;
