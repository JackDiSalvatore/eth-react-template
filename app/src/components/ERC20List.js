import { TOKENS_BY_NETWORK } from "../utils";
import ERC20Balance from './ERC20/ERC20Balance';
import ERC20Transfer from './ERC20/ERC20Transfer';

const ERC20List = ({ chainId }) => {
  return (
    <>
      {TOKENS_BY_NETWORK[chainId].map((token) => (
        <div key={token.address} style={{padding: "0.25rem 0"}}>
          <ERC20Balance {...token} />
          <ERC20Transfer {...token} />
        </div>
      ))}
    </>
  )
}

export default ERC20List;
