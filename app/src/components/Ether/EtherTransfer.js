import React from 'react';
import { useState } from 'react';
import useTransferEther from '../hooks/useTransferEther';

const EtherTransfer = () => {
  const { transferEther } = useTransferEther();
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('')

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.5fr',
      }}>
      <div className="token-transfer-container">
        <input
          className="TransferInput"
          value={amount}
          type="text"
          placeholder="ETH"
          onChange={(e) => setAmount(e.target.value)}
        ></input>

        <input
          className="TransferInput"
          value={to}
          type="text"
          placeholder="To: 0x"
          onChange={(e) => setTo(e.target.value)}
        ></input>
      </div>
      <button onClick={() => transferEther(to, amount)}>SEND</button>
    </div>

  );
}

export default EtherTransfer;
