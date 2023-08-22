// Imports
import './App.css';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/Faucet.json";


// App
function App() {

  // const holders for faucet page
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransactionData] = useState("");
  const contractABI = abi.abi;

  // Checks wallet and gets current wallet
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);


  // connects wallet
  const connectWallet = async () => {


    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {

        // gets provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // gets Accounts
        const accounts = await provider.send("eth_requestAccounts", []);
        
        // gets Signer
        setSigner(provider.getSigner());

        // connects to contract address facuet
        setFcContract( new ethers.Contract("0xBAF9db9df4e33C28B665f4F4f47536894Ff1E55e",contractABI,provider));
        
        // Set active wallet
        setWalletAddress(accounts[0]);

      } 
      
      catch (err) {

        console.error(err.message);

      }

    } 
    
    else {

      // Metamask not insatlled
      console.log("Please install MetaMask");

    }

  };

  // Gets current wallet
  const getCurrentWalletConnected = async () => {

    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {

      try {

        // gets provider in window ethrum
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // gets Account
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {

          // gets Signer
          setSigner(provider.getSigner());

          // connects to contract address facuet
          setFcContract(new ethers.Contract("0xBAF9db9df4e33C28B665f4F4f47536894Ff1E55e",contractABI,provider));

          // Set active wallet
          setWalletAddress(accounts[0]);
        } 
        
        else {

          // Connnect Metamask
          console.log("Connect to MetaMask using the Connect Wallet button");

        }

      } 
      
      catch (err) {

        console.error(err.message);

      }

    } 
    
    else {

      // Metamask not installed
      console.log("Please install MetaMask");

    }
  };

  // Wallet listner
  const addWalletListener = async () => {

    // Window ethrum
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      
      window.ethereum.on("accountsChanged", (accounts) => {

        setWalletAddress(accounts[0]);

      });

    } 

    else {

      // Metamask not installed

      setWalletAddress("");

      console.log("Please install MetaMask");

    }

  };

  // Requesting of Token
  const reqTok = async () => {

    // Error blank and success
    setWithdrawError("");
    setWithdrawSuccess("");

    try {

      // connects signer your wallat
      const fcContractWithSigner = fcContract.connect(signer);

      // Calls faucet contract to request tokens
      const resp = await fcContractWithSigner.requestTokens();

      // For sucess
      setWithdrawSuccess("Operation succeeded - enjoy your tokens!");
     
      // hash transaction data
      setTransactionData(resp.hash);
    } 
    
    catch (err) {

      // error message to error
      setWithdrawError(err.message);

    }

  };

  // Page
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">College Token (CT)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 50 CT/day.</p>
            <div className="mt-5">
              {withdrawError && (
                <div className="withdraw-error">{withdrawError}</div>
              )}
              {withdrawSuccess && (
                <div className="withdraw-success">{withdrawSuccess}</div>
              )}{" "}
            </div>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                    defaultValue={walletAddress}
                  />
                </div>
                <div className="column">
                  <button
                    className="button is-link is-medium"
                    onClick={reqTok}
                    disabled={walletAddress ? false : true}
                  >
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>
                    {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;