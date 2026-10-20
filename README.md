# GLD072 / SLV072 Token Dashboard

Group 3 (Token creators) · Blockchain lab · Ethereum **Sepolia** testnet only.

**Live dashboard:** https://sarlote-a.github.io/student-token-dashboard/

## Tokens

| Property | Token A | Token B |
|---|---|---|
| Name / symbol | Gold072 / GLD072 | Silver072 / SLV072 |
| Purpose | Rare achievements, premium actions | Common rewards, basic actions |
| Initial supply | 10,000 | 100,000 |
| Decimals | 18 | 18 |
| Mint policy | Fixed supply, no further minting | Fixed supply, no further minting |
| Contract | `0x07eEc8499bC9f824fF6570a13867c3B1A5f84bA4` | `0x08945bC23e0022AE2876998EA5fd29F952A3F3E8` |
| Deployment tx | https://sepolia.etherscan.io/tx/0x32301a339930e69e1b1bc2e30e03d4f6f4567611ceaf4699ff78424affa942f8 | https://sepolia.etherscan.io/tx/0xa359e3dd891a883554433c8d085dc30fdc8f6acc933e97426ac232c1a4fb109c |

Creator wallet: `0x99aeA2Da85075D4283A347011883bc299c259d6A`

**Why two tokens?** GLD072 is scarce (10× smaller supply) and rewards rare achievements; SLV072 is plentiful and used for everyday rewards. The contracts differ in only two places: the name/symbol and the minted supply.

## Lecturer-wallet transfers (mandatory)

Recipient: `0x5f3046bD5aA3c6d4575AF09B8198d584f130708E`

| Token | Amount | Transaction |
|---|---|---|
| GLD072 | 1.0 | https://sepolia.etherscan.io/tx/0x8fb514441423bf7d756b20595436cdce3fd2b885b74f9a10c134fac4acc83e0c |
| SLV072 | 1.0 | https://sepolia.etherscan.io/tx/0x58ddce8946944f759c314bb453ed2b6f0a0365a86598cf7e3c7d6c0d378bd87f |

## Transfers to classmates (two-wallet test)

| Token | Amount | Recipient | Transaction |
|---|---|---|---|
| GLD072 | 10 | Serhii `0x2E5fb463721ff810cF0CEAc0aD9d0B3b2e020515` | https://sepolia.etherscan.io/tx/0xb43608749a96055114db6fb339f23848413516c179c053c4ff6cceac866b96c2 |
| SLV072 | 10 | Serhii `0x2E5fb463721ff810cF0CEAc0aD9d0B3b2e020515` | https://sepolia.etherscan.io/tx/0x82a38f4d32e71325757e7a9dc8e42a43244b116cdf4a3e9a1c2c2c93a3a25330 |
| GLD072 | 10 | Amir `0x8898aaBCf31f5CD257d403453F5F16279562Ea70` | https://sepolia.etherscan.io/tx/0x57d28b4762d3b973f53bd78a00834e51791e3ec5fbc8ea077dd3119746bc410d |
| SLV072 | 10 | Amir `0x8898aaBCf31f5CD257d403453F5F16279562Ea70` | https://sepolia.etherscan.io/tx/0xa596f54ca920d9a1a59adb312d7abbd10e9645f7f4d1898c83bdbd130c89d6a2 |

totalSupply stays 10,000 GLD072 / 100,000 SLV072; only balances change.

## How to get tokens

Ask the creator wallet above for a transfer, then add each contract address in MetaMask → Import tokens.

## Tests

| Test | Result |
|---|---|
| Invalid address | Rejected before MetaMask opens |
| Zero / excess amount | Rejected with message |
| Wrong network | Warning shown, Send disabled |
| MetaMask cancel | "Transaction cancelled", no success shown |
| Reload | Balances re-read from chain |

## Gas

Every transaction (deploy, transfer) costs a small amount of SepoliaETH as gas, paid to validators for executing the transaction. The tokens themselves are moved by the ERC-20 `transfer()` call; ETH is only used for the fee.
