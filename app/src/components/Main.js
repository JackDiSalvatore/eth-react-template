import React from 'react';
import { SWRConfig } from "swr";
import ERC20ABI from "../abi/ERC20.abi.json";
import EtherBalance from './Ether/EtherBalance';
import TransferEther from './Ether/EtherTransfer';
import ERC20List from './ERC20List';
import { fetcher } from "../utils";

const Main = ({ chainId, library }) => {
    return (
        <SWRConfig value={{ fetcher: fetcher(library, ERC20ABI) }}>
        <div className="grid-container">
          <div className="grid-item">
            <strong>ETH</strong>
            <EtherBalance />
            <TransferEther />
          </div>
        </div>

        <div className="grid-container">
          <div className="grid-item">
            <strong>ERC20 Tokens</strong>
            <ERC20List chainId={chainId}/>
          </div>
        </div>
      </SWRConfig>
    )
}

export default Main;