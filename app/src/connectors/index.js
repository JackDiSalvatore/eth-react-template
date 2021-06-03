import { Networks } from '../utils'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { LatticeConnector } from '@web3-react/lattice-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { MagicConnector } from '@web3-react/magic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
// import Portis from '@portis/web3';
import { TorusConnector } from '@web3-react/torus-connector'

// Icons
import MetaMaskIcon from '../assets/wallets/metamask.svg';
import WalletConnectIcon from '../assets/wallets/walletconnect.svg';
import CoinbaseWalletIcon from '../assets/wallets/walletlink.svg';
import LedgerIcon from '../assets/wallets/ledger.png';
import LatticeIcon from '../assets/wallets/lattice.png';
import FortmaticIcon from '../assets/wallets/fortmatic.png';
import PortisIcon from '../assets/wallets/portis.png';
import TorusIcon from '../assets/wallets/torus.png';

require('dotenv').config()

const POLLING_INTERVAL = 12000

const RPC_URLS = {
  1: process.env.REACT_APP_RPC_URLS_1, // MainNet
  3: process.env.REACT_APP_RPC_URLS_3, // Ropsten
  4: process.env.REACT_APP_RPC_URLS_4, //Rinkeby)
  5: process.env.REACT_APP_RPC_URLS_5, // Goerli
  42: process.env.REACT_APP_RPC_URLS_42, // Kovan
  1337: process.env.REACT_APP_RPC_URLS_1337, // Localhost
}

const ConnectorNamesLocal = {
  Injected: 'MetaMask',
  WalletConnect: 'WalletConnect',
  WalletLink: 'Coinbase Wallet',
  Ledger: 'Ledger',
  Lattice: 'Lattice',
  Fortmatic: 'Fortmatic',
  Portis: 'Portis',
  Torus: 'Torus',
  // Network: 'Network',
  // Trezor: 'Trezor',
  // Frame: 'Frame',
  // Authereum: 'Authereum',
  // Magic: 'Magic',
}

export const ConnectorNames = ConnectorNamesLocal

// ********************************************
// Connectors
// ********************************************

export const injected = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet,
    Networks.Ropsten,
    Networks.Rinkeby,
    Networks.Goerli,
    Networks.Kovan,
    Networks.Localhost,
  ],
})

export const network = new NetworkConnector({
  urls: { 
    1: RPC_URLS[1],
    3: RPC_URLS[3],
    4: RPC_URLS[4],
    5: RPC_URLS[5],
    42: RPC_URLS[42],
    1337: RPC_URLS[1337],
  },
  defaultChainId: 1
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'web3-react example',
  appLogoUrl: 'APP_LOGO_URL',
  darkMode: false,
})

export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL })

export const trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'dummy@abc.xyz',
  manifestAppUrl: 'http://localhost:1234'
})

export const lattice = new LatticeConnector({
  chainId: 1,
  appName: 'web3-react',
  url: RPC_URLS[1],
})

export const frame = new FrameConnector({ supportedChainIds: [1] })

export const authereum = new AuthereumConnector({ chainId: 42 })

export const fortmatic = new FortmaticConnector({ apiKey: process.env.REACT_APP_FORTMANTIC_API_KEY, chainId: 1 })

export const magic = new MagicConnector({
  apiKey: process.env.MAGIC_API_KEY,
  chainId: 4,
  email: 'hello@example.org'
})

export const portis = new PortisConnector({ dAppId: process.env.REACT_APP_PORTIS_DAPP_ID, networks: [1, 100] })
// export const portis = new Portis(process.env.REACT_APP_PORTIS_DAPP_ID, 'mainnet')

export const torus = new TorusConnector({ chainId: 1 })

export const connectorsByName = {
  [ConnectorNamesLocal.Injected]: {
    connector: injected,
    icon: MetaMaskIcon,
  },
  [ConnectorNamesLocal.WalletConnect]: {
    connector: walletconnect,
    icon: WalletConnectIcon,
  },
  [ConnectorNamesLocal.WalletLink]: {
    connector: walletlink,
    icon: CoinbaseWalletIcon,
  },
  [ConnectorNamesLocal.Ledger]: {
    connector: ledger,
    icon: LedgerIcon,
  },
  [ConnectorNamesLocal.Lattice]: {
    connector: lattice,
    icon: LatticeIcon,
  },
  [ConnectorNamesLocal.Fortmatic]: {
    connector: fortmatic,
    icon: FortmaticIcon,
  },
  [ConnectorNamesLocal.Portis]: {
    connector: portis,
    icon: PortisIcon,
  },
  [ConnectorNamesLocal.Torus]: {
    connector: torus,
    icon: TorusIcon,
  },
  // [ConnectorNames.Network]: network,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Magic]: magic,
}