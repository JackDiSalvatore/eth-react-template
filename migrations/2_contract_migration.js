const ERC20Token = artifacts.require("ERC20Token");

function tokens (amount) {
  return web3.utils.toBN(
    web3.utils.toWei(amount.toString(), "ether")
  )
}

module.exports = function (deployer) {
  deployer.deploy(ERC20Token, "Dai", "DAI", tokens(1000));
  deployer.deploy(ERC20Token, "Maker", "MKR", tokens(1000));
};
