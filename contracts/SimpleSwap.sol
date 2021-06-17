// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleSwap {
  address private _usdcAddress;
  address private _wethAddress;

  constructor(address usdcAddress, address wethAddress) {
    _usdcAddress = usdcAddress;
    _wethAddress = wethAddress;
  }

  function price() public view returns (uint) {
    ERC20 usdc = ERC20(_usdcAddress);
    ERC20 weth = ERC20(_wethAddress);
    uint256 usdcBalance = usdc.balanceOf(address(this));
    uint256 wethBalance = weth.balanceOf(address(this));
    return usdcBalance / wethBalance;
  }
}
