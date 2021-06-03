import { Contract } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'

// Token Icons
import MKRIcon from '../assets/tokens/maker-mkr-logo.svg';
import DAIIcon from '../assets/tokens/multi-collateral-dai-dai-logo.svg';

const UnknownIcon = "https://img.icons8.com/ios-glyphs/30/000000/question-mark.png"

export const Networks = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Localhost: 1337,
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export const TOKENS_BY_NETWORK = {
  [Networks.MainNet]: [
    {
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      name: 'Maker',
      symbol: 'MKR',
      decimals: 18,
      icon: MKRIcon,
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      icon: DAIIcon,
    },
  ],
  [Networks.Ropsten]: [
    {
      address: '0xad6d458402f60fd3bd25163575031acdce07538d',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18,
      icon: DAIIcon,
    },
    {
      address: '0x972a444311a8677b63df192b197f8b8a45126ff6',
      symbol: 'MKR',
      name: 'Maker',
      decimals: 18,
      icon: MKRIcon,
    },
  ],
  [Networks.Rinkeby]: [
    {
      address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18,
      icon: DAIIcon,
    },
    {
      address: '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85',
      symbol: 'MKR',
      name: 'Maker',
      decimals: 18,
      icon: MKRIcon,
    },
  ],
  [Networks.Goerli]: [
    {
      address: '0x587b3c7d9e252effb9c857ef4c936e2072b741a4',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18,
      icon: DAIIcon,
    },
    {
      address: '0xb69a66075b6e73fb8741edf5d2127e8b11a483e5',
      symbol: 'MKR',
      name: 'Maker',
      decimals: 18,
      icon: MKRIcon,
    },
  ],
  [Networks.Kovan]: [
    {
      address: '0xfdf7f21eda1fb8aebed2fc8b0e8f72a8f17cf823',
      symbol: 'DAI',
      name: 'Dai',
      decimals: 18,
      icon: DAIIcon,
    },
    {
      address: '0xe37974e5784bee9885a6e21888556fb779de600e',
      symbol: 'MKR',
      name: 'Maker',
      decimals: 18,
      icon: MKRIcon,
    },
  ],
  [Networks.Localhost]: [
    {
      address: "0xDa587146307e2E54E0f9bF0601350149d4619182",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAIIcon,
    },
    {
        address: "0x04024a9a11f0Cba69D962EEc5e5B33CfA423bDb1",
        symbol: "MKR",
        name: "Maker",
        decimals: 18,
        icon: MKRIcon,
      },
  ],
}
export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str

export const fetcher = (library, abi) => (...args) => {
  const [arg1, arg2, ...params] = args
  // it's a contract
  if (isAddress(arg1)) {
    const address = arg1
    const method = arg2
    const contract = new Contract(address, abi, library.getSigner())
    return contract[method](...params)
  }
  // it's a eth call
  const method = arg1
  return library[method](arg2, ...params)
}