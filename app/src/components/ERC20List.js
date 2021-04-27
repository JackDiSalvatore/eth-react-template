import { TOKENS_BY_NETWORK } from "../utils";
import ERC20Balance from './ERC20/ERC20Balance';
import ERC20Transfer from './ERC20/ERC20Transfer';

const ERC20List = ({ chainId }) => {
  return (
    <>
      {TOKENS_BY_NETWORK[chainId].map((token) => (
        <div className="token-container" key={token.address}>
          <img
            style={{
              width: '48px',
              height: '48px',
              margin: 'auto',
            }}
            src={token.icon}
            alt="ethereum Icon"
          ></img>
          <ERC20Balance {...token} />
          <ERC20Transfer {...token} />
        </div>
      ))}
    </>
  )
}

export default ERC20List;
