import React from 'react';
import { useWeb3React } from '@web3-react/core'
import { SWRConfig } from "swr";

// Utils
import { fetcher } from "../utils";
import { connectorsByName } from '../connectors'
// import reportWebVitals from '../reportWebVitals';

// hooks
import useEagerConnect from './hooks/useEagerConnect';
import useInactiveListener from './hooks/useInactiveListener';

// Components
import ERC20ABI from "../abi/ERC20.abi.json";
import Header from './Header';
import Ether from './Ether/Ether';
import ERC20List from './ERC20List';
import Borrow from './Borrow/Borrow';
import Modal from 'react-bootstrap/Modal';
import Spinner from './Spinner'

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

  // wallet modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="App">
      <Header
        active={active}
        error={error}
        account={account}
        deactivate={deactivate}
        setModalShow={setModalShow}
      />

      {!!(library && account) ? (
        <div className="Container">
          <SWRConfig value={{ fetcher: fetcher(library, ERC20ABI) }}>
            <Ether />
            <ERC20List chainId={chainId} />
          </SWRConfig>
        </div>
      ) : (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          // {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={true} // animation on dom element throws warning
          className="Modal"
        >
        <Modal.Body>
          <div
            style={{
              display: 'grid',
              gridGap: '1rem',
              gridAutoColumns: '1fr 1fr',
              maxWidth: '20rem',
              margin: 'auto'
            }}
          >
            <strong>Connect to a wallet</strong>
            {Object.keys(connectorsByName).map(name => {
              const currentConnector = connectorsByName[name].connector
              const activating = currentConnector === activatingConnector
              const connected = currentConnector === connector
              const disabled = !triedEager || !!activatingConnector || connected || !!error

              return (
                <button
                  className= "WalletButton"
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    setActivatingConnector(currentConnector)
                    activate(connectorsByName[name].connector)
                    setModalShow(false)
                  }}
                >
                  {activating && (
                    <Spinner color={'black'} style={{ height: '25%' }} />
                  )}
                  <div>
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
            <strong>
              New to Ethereum?
              <span> </span>
              <a href="https://ethereum.org/en/wallets/">Learn more about wallets</a>
            </strong>
          </div>
        </Modal.Body>
        <Modal.Footer style={{border: 'none'}}>
          <button onClick={() => setModalShow(false)}>Close</button>
        </Modal.Footer>
      </Modal>
      )}

      <div className="Container">
        {/* <h1>App Name Here</h1> */}
        <Borrow />
      </div>

    </div>
  )
}

export default Wallet;