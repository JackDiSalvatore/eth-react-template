// import React from 'react';
import useSWR from 'swr'
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units';
import { AuthereumConnector } from '@web3-react/authereum-connector';

const EtherBalance = () => {
  const { account, library } = useWeb3React()
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'])
  // fetcher in './utils/index.js'

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`)
    library.on('block', () => {
      console.log('update balance...')
      mutate(undefined, true)
    })
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners('block')
    }
    // trigger the effect only on component mount
  }, [library, mutate])

  if (!balance) {
    return <div className="TokenBalance">...</div>
  }
  if (parseFloat(formatEther(balance)).toPrecision(1) == 0) {
    return <div className="TokenBalance">0 ETH</div>
  }
  return (
    <div className="TokenBalance">
      {parseFloat(formatEther(balance)).toPrecision(4)} ETH
    </div>
  )
}

export default EtherBalance;