import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.28", // версія вашого контракту
  paths: {
    artifacts: "./artifacts",
  },
  typechain: {
    outDir: "typechain", // зберігає згенеровані типи у цій директорії
    target: "ethers-v6", // використовує "ethers-v5" для генерації типів
  },
};

export default config;
