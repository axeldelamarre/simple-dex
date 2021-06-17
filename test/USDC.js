const USDC = artifacts.require("./USDC.sol");

contract("USDC", accounts => {
  it("...should make transfers", async () => {
    const usdc = await USDC.deployed();

    let balance = await usdc.balanceOf(accounts[1]);
    assert.equal(balance.toString(), "0", "Initial balance isn't 0");

    await usdc.transfer(accounts[1], 1000, {from: accounts[9]});

    balance = await usdc.balanceOf(accounts[1]);
    assert.equal(balance.toString(), "1000", "Initial balance isn't 1000");
  });
});
