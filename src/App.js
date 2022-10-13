import logo from './logo.svg';
import React, { useMemo, useEffect, useState } from "react";
import './App.css';
import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton,WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { SubmitButton } from './Buttons';


require('@solana/wallet-adapter-react-ui/styles.css');

function App() {

  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(() => [ new PhantomWalletAdapter()]);

  return (
    <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           <code>src/App.js</code> and save to reload.
        </p>
        <WalletMultiButton />
        <SubmitButton/>
        
      </header>
    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
}

export default App;
