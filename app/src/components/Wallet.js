import React from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

import useEagerConnect from './hooks/useEagerConnect';
import useInactiveListener from './hooks/useInactiveListener';
import { Networks, shorter } from "../utils";

import Main from './Main';

import Spinner from './Spinner'

import {
  injected,
  walletconnect,
  walletlink,
  ledger,
  lattice,
  fortmatic,
  portis,
  torus,
  // network,
  // trezor,
  // frame,
  // authereum,
  // magic,
} from '../connectors'
// import reportWebVitals from '../reportWebVitals';

import MetaMaskIcon from '../assets/metamask.svg';
import WalletConnectIcon from '../assets/walletconnect.svg';
import CoinbaseWalletIcon from '../assets/walletlink.svg';
import LedgerIcon from '../assets/ledger.png';
import LatticeIcon from '../assets/lattice.png';
import FortmaticIcon from '../assets/fortmatic.png';
import PortisIcon from '../assets/portis.png';
import TorusIcon from '../assets/torus.png';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet,
    Networks.Ropsten,
    Networks.Rinkeby,
    Networks.Goerli,
    Networks.Kovan,
    Networks.Localhost,
  ],
})

// I am going to comment out some stuff 
const ConnectorNames = {
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

const connectorsByName = {
  [ConnectorNames.Injected]: {
    connector: injected,
    icon: MetaMaskIcon,
  },
  [ConnectorNames.WalletConnect]: {
    connector: walletconnect,
    icon: WalletConnectIcon,
  },
  [ConnectorNames.WalletLink]: {
    connector: walletlink,
    icon: CoinbaseWalletIcon,
  },
  [ConnectorNames.Ledger]: {
    connector: ledger,
    icon: LedgerIcon,
  },
  [ConnectorNames.Lattice]: {
    connector: lattice,
    icon: LatticeIcon,
  },
  [ConnectorNames.Fortmatic]: {
    connector: fortmatic,
    icon: FortmaticIcon,
  },
  [ConnectorNames.Portis]: {
    connector: portis,
    icon: PortisIcon,
  },
  [ConnectorNames.Torus]: {
    connector: torus,
    icon: TorusIcon,
  },
  // [ConnectorNames.Network]: network,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Magic]: magic,
}

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'Not Connected. An Error occurred.'
  }
}

const Wallet = () => {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  return (
    <>
      <div
        style={{
          display: 'grid',
          // gridGap: '1rem',
          gridTemplateColumns: '1fr',
          margin: '0 0.5rem',
          justifyItems: 'right',
          // alignItems: 'center',
        }}
      >
        {(active || error) && (
          <div
            style={{
              display: 'flex',
            }}
          >
            <p style={{textAlign: 'right', margin: '1rem'}}>{shorter(account)}</p>
            <button
              style={{
                // height: '100%',
                width: '10rem',
                // margin: 'auto',
                borderRadius: '1rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onClick={(connector) => {
                if ( (connector === connectorsByName[ConnectorNames.Portis].connector) ||
                    (connector === connectorsByName[ConnectorNames.Torus].connector) ||
                    (connector === connectorsByName[ConnectorNames.Fortmatic.connector]) ||
                    (connector === connectorsByName[ConnectorNames.WalletLink].connector)
                  ) {
                  connector.close()
                } else {
                  // WalletConnect
                  // Ledger
                  deactivate()
                }
              }}
            >
              Deactivate Wallet
            </button>
          </div>
        )}

        {!!error && (
          <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>
        )}
      </div>

      {!!(library && account) ? (
        <div className="App">
          <Main chainId={chainId} library={library} />
        </div>
        ) : (
        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridAutoColumns: '1fr 1fr',
            maxWidth: '20rem',
            margin: 'auto'
          }}
        >
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name].connector
            const activating = currentConnector === activatingConnector
            const connected = currentConnector === connector
            const disabled = !triedEager || !!activatingConnector || connected || !!error

            return (
              <button
                style={{
                  height: '3rem',
                  borderRadius: '0.5rem',
                  cursor: disabled ? 'unset' : 'pointer',
                  // position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0px',
                  opacity: '1',
                  width: '100% !important',
                }}
                disabled={disabled}
                key={name}
                onClick={() => {
                  setActivatingConnector(currentConnector)
                  activate(connectorsByName[name].connector)
                }}
              >
                {activating && (
                  <div
                    style={{
                      // position: 'absolute',
                      // top: '0',
                      // left: '0',
                      // height: '100%',
                      // display: 'flex',
                      // justifyItems: 'right',
                      // alignItems: 'center',
                      // color: 'black',
                      // margin: '0 0 0 1rem'
                    }}
                  >
                    <Spinner color={'black'} style={{ height: '25%' }} />
                  </div>
                )}
                <div
                  style={{
                    margin: '0 0',
                  }}
                >
                  {name}
                </div>
                <img 
                  margin="auto auto"
                  style={{
                    width: '24px',
                    height: '24px',
                    textAlign: 'right',
                  }}
                  src={connectorsByName[name].icon} alt="https://iconscout.com/icons/metamask by https://iconscout.com/contributors/icon-mafia">
                </img>
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Wallet;