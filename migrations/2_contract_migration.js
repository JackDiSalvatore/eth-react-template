const ERC20Token = artifacts.require("ERC20Token");

function tokens (amount) {
  return web3.utils.toBN(
    web3.utils.toWei(amount.toString(), "ether")
  )
}

module.exports = function (deployer) {
  deployer.deploy(ERC20Token, "XyzToken", "XYZ", tokens(1000));
  deployer.deploy(ERC20Token, "AbcToken", "ABC", tokens(1000));
};
