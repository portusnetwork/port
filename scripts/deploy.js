const hardhat = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hardhat.run('compile');

    // We get the contract to deploy
    const PortToken = await hardhat.ethers.getContractFactory("PortToken");
    console.log("Deploying PortToken...");
    const token = await PortToken.deploy();

    await token.deployed();

    console.log("Token deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
