const USDC = artifacts.require("./USDC.sol");
const WETH = artifacts.require("./WETH.sol");
const SimpleSwap = artifacts.require("./SimpleSwap.sol");

module.exports = async (deployer, network, accounts) => {
  const amount = web3.utils.toBN("1" + "0".repeat(18 + 6));

  await deployer.deploy(USDC, amount, {from: accounts[9]});
  await deployer.deploy(WETH, amount, {from: accounts[9]});
  await deployer.deploy(SimpleSwap, USDC.address, WETH.address, {from: accounts[8]});
};
