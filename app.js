// Deployed GLD072 / SLV072 contracts on Sepolia.
const TOKENS = {
  A: { address: "0x07eEc8499bC9f824fF6570a13867c3B1A5f84bA4", symbol: "GLD072" },
  B: { address: "0x08945bC23e0022AE2876998EA5fd29F952A3F3E8", symbol: "SLV072" },
};
const SEPOLIA_CHAIN_ID = 11155111n;
const ERC20_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

const $ = (id) => document.getElementById(id);
let provider, signer, account;

function setStatus(msg, cls = "") {
  $("status").textContent = msg;
  $("status").className = cls;
}

async function onSepolia() {
  const { chainId } = await provider.getNetwork();
  const ok = chainId === SEPOLIA_CHAIN_ID;
  $("warning").style.display = ok ? "none" : "block";
  $("send").disabled = !ok;
  return ok;
}

async function refreshBalances() {
  if (!(await onSepolia())) return;
  for (const [key, el] of [["A", "balA"], ["B", "balB"]]) {
    try {
      const c = new ethers.Contract(TOKENS[key].address, ERC20_ABI, provider);
      const [raw, dec] = await Promise.all([c.balanceOf(account), c.decimals()]);
      $(el).textContent = `${ethers.formatUnits(raw, dec)} ${TOKENS[key].symbol}`;
    } catch {
      $(el).textContent = "error reading balance";
    }
  }
}

async function connect() {
  if (!window.ethereum) return setStatus("MetaMask not found. Install it first.", "err");
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  account = await signer.getAddress();
  $("account").textContent = account;
  if (!(await onSepolia())) {
    try {
      await provider.send("wallet_switchEthereumChain", [{ chainId: "0xaa36a7" }]);
    } catch { /* user declined; warning stays visible */ }
  }
  await refreshBalances();
}

async function send() {
  setStatus("");
  if (!signer) return setStatus("Connect your wallet first.", "err");
  if (!(await onSepolia())) return setStatus("Switch to Ethereum Sepolia first.", "err");

  const to = $("to").value.trim();
  if (!ethers.isAddress(to)) return setStatus("Invalid destination address.", "err");

  const token = TOKENS[$("token").value];
  const erc20 = new ethers.Contract(token.address, ERC20_ABI, signer);
  const decimals = await erc20.decimals();

  let amount;
  try {
    amount = ethers.parseUnits($("amount").value.trim(), decimals);
  } catch {
    return setStatus("Invalid amount.", "err");
  }
  const balance = await erc20.balanceOf(account);
  if (amount <= 0n) return setStatus("Amount must be greater than zero.", "err");
  if (amount > balance) return setStatus("Insufficient token balance.", "err");

  try {
    setStatus("Confirm the transaction in MetaMask…");
    const tx = await erc20.transfer(to, amount);
    setStatus(`Sent, waiting for confirmation…\n${tx.hash}`);
    const receipt = await tx.wait();
    if (receipt.status !== 1) throw new Error("Transaction failed");
    setStatus(`Confirmed: https://sepolia.etherscan.io/tx/${tx.hash}`, "ok");
    await refreshBalances();
  } catch (e) {
    if (e.code === "ACTION_REJECTED") setStatus("Transaction cancelled in MetaMask. Nothing was sent.", "err");
    else setStatus(`Transfer failed: ${e.shortMessage || e.message}`, "err");
  }
}

$("connect").addEventListener("click", connect);
$("send").addEventListener("click", send);
if (window.ethereum) {
  window.ethereum.on("chainChanged", () => location.reload());
  window.ethereum.on("accountsChanged", () => location.reload());
}
