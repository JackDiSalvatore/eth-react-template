const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const ERC20Token = artifacts.require("ERC20Token");

function tokens (amount) {
  return web3.utils.toBN(
    web3.utils.toWei(amount.toString(), "ether")
  )
}

contract("ERC20Token", async ([deployer, recipient]) => {
  let token
  let initialSupply = tokens(100)

  beforeEach("deploy contract", async () => {
    token = await ERC20Token.new("XyzToken", "XYZ", initialSupply)
  })

  describe("deployed", async () => {
    it("Shall be deployed", async () => {
      assert("XyzToken" == (await token.name()), "name not updated")
      assert("XYZ" == (await token.symbol()), "symbol not updated")
      assert(initialSupply.eq(await token.totalSupply()), "totalSupply not updated")
    })
  })

  describe("transfer", async () => {
    it('Should transfer balances from one account to another', async () => {
      const value = tokens(100)	// 100 Wei
      const senderBalanceBefore = web3.utils.toBN(await token.balanceOf(deployer))
      const recipientBalanceBefore = web3.utils.toBN(await token.balanceOf(recipient))
  
      console.log('deployer balance before: ' + senderBalanceBefore)
      console.log('recipient balance before: ' + recipientBalanceBefore)
      console.log('value: ' + value)
  
      const receipt = await token.transfer(recipient, value, {from: deployer})
  
      const senderBalanceAfter = web3.utils.toBN(await token.balanceOf(deployer))
      const recipientBalanceAfter = web3.utils.toBN(await token.balanceOf(recipient))
  
      // sender: 10000 - 1 = 9999
      assert(senderBalanceBefore.sub(senderBalanceAfter).eq(value),
             'incorrect sender balance: ' + senderBalanceBefore.sub(senderBalanceAfter))
      // recipient: 0 + 1 = 1
      assert(recipientBalanceAfter.sub(recipientBalanceBefore).eq(value),
             'incorrect recipient balance: ' + recipientBalanceAfter.sub(recipientBalanceBefore))
      expectEvent(receipt, 'Transfer', {
        from: deployer,
        to: recipient,
        value: value
      })
    })
  })

})
