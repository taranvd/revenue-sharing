# Revenue Sharing Smart Contract

## Overview

This repository contains a Solidity smart contract that facilitates revenue sharing among multiple participants. The `RevenueSharing` contract allows the contract owner to define a set of participants and their corresponding share percentages. It ensures that the total share percentages always sum to 100%, and it enforces access control to prevent unauthorized actions.

The contract is built using **Hardhat** for development and testing and is fully integrated with **TypeScript** for type safety and improved developer experience.

## Features

- **Revenue Distribution**: Distribute Ether (ETH) among participants based on predefined percentages.
- **Access Control**: Only the contract owner can add participants and initiate revenue distribution.
- **Error Handling**: Custom error messages for invalid actions like exceeding 100% in total shares or unauthorized access.
- **TypeScript Integration**: TypeScript-based testing and contract interaction scripts.

## How It Works

### Adding Participants

The owner of the contract can add participants with a specific share percentage, ensuring that the total percentage does not exceed 100%. The participants will receive payments according to their share when revenue is distributed.

### Distributing Revenue

The owner can send Ether to the contract, and the contract will automatically divide the funds among participants according to their share percentages.

### Contract Security

The contract implements custom error messages to ensure that only the owner can add participants, and that total share percentages remain at 100%. If an invalid operation is attempted, an appropriate error will be thrown.

## Requirements

To run and test the smart contract, you'll need:

- **Node.js** (LTS version recommended)
- **Hardhat** for smart contract development and testing
- **TypeScript** for writing tests and scripts
- **ethers.js** for interacting with the blockchain

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/taranvd/revenue-sharing.git
   cd revenue-sharing
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Deployment

To deploy the smart contract on a local Hardhat network:

1. Start a local Hardhat node:

   ```bash
   npx hardhat node
   ```

2. Deploy the contract to the local network by running the deployment script:

   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

## Testing

The contract is tested using **Mocha** and **Chai** through Hardhat's testing framework. To run the tests:

```bash
npx hardhat test
```
