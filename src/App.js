import logo_white from "./logo_cloak_white.png";
import logo_black from "./logo_cloak_black.png";
import Web3 from "web3";
import { useWallet, UseWalletProvider } from "use-wallet";

import "./App.css";

function App() {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();

  const onConnect = () => {
    console.log("OnConnected");
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          console.log("test");
          wallet.connect();
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  console.log("====", wallet);

  return (
    <div className="App">
      <div className="App-header"></div>
      <img width={200} className="cloak-logo" src={logo_black} />
      <h1 className="title">Wrapped Navcoin Bridge</h1>
      <button onClick={() => onConnect()}>CONNECT</button>
    </div>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: "my-dapp-id-123-xyz" },
    }}
  >
    <App />
  </UseWalletProvider>
);
