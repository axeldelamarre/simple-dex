const SimpleSwap = artifacts.require("./SimpleSwap.sol");
const USDC = artifacts.require("./USDC.sol");
const WETH = artifacts.require("./WETH.sol");

contract("SimpleSwap", accounts => {
  it("should compute correct price", async () => {
    const simpleSwap = await SimpleSwap.deployed();

    let coin = await USDC.deployed();
    let amount = web3.utils.toWei("25000");
    await coin.transfer(simpleSwap.address, amount, {from: accounts[9]});

    coin = await WETH.deployed();
    amount = web3.utils.toWei("10");
    await coin.transfer(simpleSwap.address, amount, {from: accounts[9]});

    const price = await simpleSwap.price.call();
    assert.equal(price.toString(), "2500", "Incorrect price");
  });
});
