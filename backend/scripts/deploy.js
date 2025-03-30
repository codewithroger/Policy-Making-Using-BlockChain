const hre = require("hardhat");

async function main() {
    const GovernanceDocumentStorage = await hre.ethers.getContractFactory("GovernanceDocumentStorage");
    const contract = await GovernanceDocumentStorage.deploy();

    // Wait for contract deployment
    await contract.waitForDeployment();  // ✅ Fix: Replaces .deployed()

    console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
