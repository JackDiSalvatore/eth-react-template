import React from 'react';
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { ConnectorNames, connectorsByName } from '../connectors'
import { shorter } from "../utils";


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

const Header = ({ active, error, account, deactivate, setModalShow }) => {
  return (
    <>
      {(active || error) ? (
        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: '1fr',
            justifyItems: 'right',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '1rem 1rem',
            }}
          >
            <p style={{textAlign: 'right', margin: '0.5rem 0'}}>{shorter(account)}</p>
            <button
              style={{
                height: '100%',
                margin: '0 0.5rem',
                padding: '0 1rem',
                cursor: 'pointer',
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
        </div>
        ) : (
        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: '1fr',
            justifyItems: 'right',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '1rem 1rem',
            }}
          >
            <p style={{textAlign: 'right', margin: '0.5rem 0'}}>{shorter(account)}</p>
            <button 
              style={{
                height: '100%',
                margin: '0.5rem 0.5rem',
                padding: '0 1rem',
                cursor: 'pointer',
              }}
              onClick={() => setModalShow(true)}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
  
      {!!error && (
        <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>
      )}
    </>
  )
}

export default Header;