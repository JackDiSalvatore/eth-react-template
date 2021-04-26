import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { Contract } from 'ethers';
import ERC20ABI from '../../abi/ERC20.abi.json';

const useTransferERC20 = (address, to, amount) => {
  const { library } = useWeb3React();

  // Hook Function
  const transferERC20 = async (address, to, amount) => {
    const signer = library.getSigner()
    const contract = new Contract(address, ERC20ABI, library.getSigner())
    const erc20CWithSigner = contract.connect(signer);
    erc20CWithSigner.transfer(
      to,
      ethers.utils.parseEther(amount)
    );
    console.log('Sending: ', amount, ', to: ', to)
  }

  return { transferERC20 };
}

export default useTransferERC20;