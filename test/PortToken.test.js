const chaiAsPromised = require('chai-as-promised');
const chai = require('chai');
const hardhat = require("hardhat");
chai.use(chaiAsPromised);

const TOTAL_SUPPLY = 100e6;
const expect = chai.expect;

let portToken;
let owner;

beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const PortToken = await ethers.getContractFactory("PortToken");
    portToken = await PortToken.deploy();
});

describe("constructor", function () {
    it("deploys correctly", async function () {
        expect(await portToken.name()).to.equal("Portus");
        expect(await portToken.symbol()).to.equal("PORT");
        expect(await portToken.decimals()).to.equal(18);
    });

    it("mint more than allowed", async function () {
        // mint the max supply
        let amountToBeMinted = ethers.utils.parseEther((TOTAL_SUPPLY).toString());
        await portToken.mint(owner.address, amountToBeMinted);
        const expectedTotalSupply = ethers.utils.parseEther((TOTAL_SUPPLY).toString());
        const totalSupply = await portToken.totalSupply();
        expect(totalSupply).to.equal(expectedTotalSupply);
        const ownerBalance = await portToken.balanceOf(owner.address);
        expect(totalSupply).to.equal(ownerBalance);

        // mint more than the max supply
        amountToBeMinted = ethers.utils.parseEther((1).toString());
        await expect (portToken.mint(owner.address, amountToBeMinted)).to.be.rejectedWith("VM Exception while processing transaction: revert ERC20Capped: cap exceeded");
    });

    it("burn", async function () {
        // mint the max supply
        await portToken.mint(owner.address, ethers.utils.parseEther((TOTAL_SUPPLY).toString()));
        // burn 1 token
        await portToken.burn(ethers.utils.parseEther((1).toString()))
        const totalSupply = await portToken.totalSupply();
        const expectedTotalSupply = ethers.utils.parseEther((TOTAL_SUPPLY-1).toString());
        expect(totalSupply).to.equal(expectedTotalSupply);
    });
});
