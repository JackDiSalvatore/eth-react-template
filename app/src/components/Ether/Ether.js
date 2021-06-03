// import React from 'react';
import EtherBalance from './EtherBalance';
import EtherTransfer from './EtherTransfer';
import EtherIcon from '../../assets/tokens/ethereum-eth-logo.svg';

const Ether = () => {
  return (
    <div className="token-container">
      <img
        style={{
          width: '48px',
          height: '48px',
          margin: 'auto',
        }}
        src={EtherIcon}
        alt="ethereum Icon"
      ></img>
      <EtherBalance />
      <EtherTransfer />
    </div>
  )
}

export default Ether;