import React from 'react';
import { useState } from 'react';
import useTransferERC20 from '../hooks/useTransferERC20';

const ERC20Transfer = ({address, symbol, name, decimals}) => {
  const { transferERC20 } = useTransferERC20();
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('')
  const amountPlaceholder = `${symbol}: 1.00`

  return (
    <div>
      <input
        className="TransferInput"
        value={amount}
        type="text"
        placeholder={amountPlaceholder}
        onChange={(e) => setAmount(e.target.value)}
      ></input>
      <input
        className="TransferInput"
        value={to}
        type="text"
        placeholder="To: 0x"
        onChange={(e) => setTo(e.target.value)}
      ></input>
      <button className="Send" onClick={() => transferERC20 (address, to, amount)}>SEND</button>
    </div>
  );
}

export default ERC20Transfer;
