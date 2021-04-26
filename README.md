# README

## Smart Contract

```bash
truffle init
npm install @openzeppelin/contracts
npm install @openzeppelin/test-helpers

# edit the truffle-config file to expose the development network
```

### Run Locally

```
truffle develop
compile
migrate --reset
```

**Fix error -32603 in MetaMask:**

`await web3.eth.getChainId()`
ChainId: 1337
RESET YOU METAMASK ACCOUNT

```
This is caused when you restart your test network or restarting from another test network. The cached transaction history in Metamask does not match the network’s history.

To fix this issue, open the “settings” tab in Metamask, and click reset for the network.
```

**Local Accounts:**

example: `truffle develop`

```
Accounts:
(0) 0x9c44266ad00ab5afeef4f36c0ca6ff04e99398db
(1) 0xaa2351c5c48d963ef3bea648cd1108dc411dafc3
(2) 0xc4bfa24d7ce6866a8718a96b51131d5c15ec5c4d
(3) 0x33d29abdf8dc49747b15ba477375e294a8e5405a
(4) 0x66538c7f4ad040da40569395b0204fa939317f71
(5) 0xbef95e6d0274d8274f04dcfce8405f37a902ba4e
(6) 0x5b658003e8137f3fc49ea57a7f4ddc65b294b1ef
(7) 0x08f721b66a0f573948a6a9173f0770f0ff355a18
(8) 0xa980f525f84e97491d8a3e0cef4a1f25f805a15d
(9) 0xd27c4de61880dec8f48bda8e908c057b4c022f8d

Private Keys:
(0) 2e59718aa27812eb2c34e3998c35a3288625d40460492dd67d93450d780d389e
(1) 2c640e883976869a40f7f9c8494923f9a1b3b50c0f94e6956a0c4e426e679ad3
(2) 2056589baedca98e19a31debf5c066c015cddf60524fa25b1a8ab25e8b7723e4
(3) 63e7a3e4deb799c25012e1873cf2bf4b77b93f20ca2969ec3f28ce707026e11c
(4) 62415c5f7c62a361ca915484acd89ab97351a138a958aa15b42e1283d8cd07df
(5) c8576e3280489aac579446ced0431e9d991ec01fb2de23d5707c5dc7cb2e5ab9
(6) 64ddf50529e0341a77169c6ce7c40c87b0b94482639294cbeb6471708f0d2527
(7) 67ed11231d2ad6a14cfa1913c8be3445193bd97a575e0b390b012b9c1f0bab08
(8) d9b6b835c53529d590299d6b643781a1be1d563c19d74419c73e1d24014f97cf
(9) 891871af196ba637ba80f31cbfcf890c59b0eba5b0b2c8459fbd2eccee123519
```

#### Test

```
truffle compile
truffle test
```

### React Web App Installations

```bash
npx create-react-app app

# Install modules
cd app
npm install ethers

npm install @web3-react/core
npm install @web3-react/injected-connector
npm install swr
npm install dotenv
```

### Run Locally

```
npm start
```
