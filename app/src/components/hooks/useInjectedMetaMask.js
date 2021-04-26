import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useInjectedMetaMask = () => {
  let [chainId, setChainId] = useState('')
  let [account, setAccount] = useState('')
  let [library, setLibrary] = useState('')
  let [activate, setActivate] = useState('')
  let [active, setActive] = useState('')

  useEffect(() => {
    const checkConnection = async () => {
      // Check if browser is running Metamask
      let web3;
      if (window.ethereum) {
          web3 = new Web3(window.ethereum);
          console.log(web3)
          setChainId(web3.eth.getChainId())
          setAccount(web3.eth.getAccounts().then(e => e[0]))
          setLibrary(web3.library)
          setActivate(web3.activate)
          setActive(web3.active)
      } else if (window.web3) {
          web3 = new Web3(window.web3.currentProvider);
      };

      // Check if User is already connected by retrieving the accounts
      web3.eth.getAccounts()
          .then(async (addr) => {
              // Set User account into state
          });
    };
    checkConnection();
  }, []);

  return { chainId, account, library, activate, active };
}

export default useInjectedMetaMask;