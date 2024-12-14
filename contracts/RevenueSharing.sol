// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Custom error to handle unauthorized access
error NotAuthorized();

// Custom error to handle invalid share percentages
error InvalidSharePercentage();

// Custom error to handle invalid total shares
error InvalidTotalShares();

/// @title Revenue Sharing Contract
/// @notice This contract allows the owner to distribute revenue among participants based on their share percentages.
/// @dev The contract uses custom errors for better gas efficiency.
contract RevenueSharing {
    // The address of the contract owner
    address public owner;

    // A mapping to store share percentages for each participant
    mapping(address => uint256) public shares;

    // An array to store the list of participants
    address[] public participants;

    /// @dev Sets the contract owner as the address deploying the contract
    constructor() {
        owner = msg.sender;
    }

    /// @dev Modifier to restrict function access to only the owner of the contract
    modifier onlyOwner() {
        if (msg.sender != owner) revert NotAuthorized();  // Reverts if not the owner
        _;
    }

    /// @notice Adds a participant to the revenue-sharing scheme
    /// @param participant The address of the participant
    /// @param sharePercentage The percentage of the revenue this participant will receive (between 0 and 100)
    /// @dev Only the owner can add participants. The total share percentage should not exceed 100%.
    /// If a participant already exists, no changes are made.
    function addParticipant(address participant, uint256 sharePercentage) public onlyOwner {
        // Ensure the share percentage is valid (cannot exceed 100%)
        if (sharePercentage > 100) revert InvalidSharePercentage();

        // If the participant is already in the contract, no need to add them again
        if (shares[participant] > 0) return;

        // Add the participant to the list and assign their share percentage
        participants.push(participant);
        shares[participant] = sharePercentage;
    }

    /// @notice Distributes the revenue to the participants based on their share percentages
    /// @dev The contract owner can call this function to distribute the funds. The total shares must equal 100%.
    /// The revenue is distributed proportionally based on the participants' share percentages.
    function distributeRevenue() public payable onlyOwner {
        uint256 totalShares = 0;

        // Calculate the total shares assigned to participants
        for (uint256 i = 0; i < participants.length; i++) {
            totalShares += shares[participants[i]];
        }

        // Ensure the total shares equal exactly 100%
        if (totalShares != 100) revert InvalidTotalShares();

        // Distribute the revenue to each participant based on their share percentage
        for (uint256 i = 0; i < participants.length; i++) {
            uint256 payment = (msg.value * shares[participants[i]]) / 100;
            payable(participants[i]).transfer(payment);
        }
    }

    // The fallback function to receive Ether
    receive() external payable {}
}
