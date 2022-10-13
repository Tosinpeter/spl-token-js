import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { AccountLayout, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, createTransferInstruction } from '@solana/spl-token';
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";
import * as SolanaWeb3 from '@solana/web3.js'




const SubmitButton = () => {
  const web3 = require('@solana/web3.js');
  const connection = new SolanaWeb3.Connection(
    SolanaWeb3.clusterApiUrl('mainnet-beta')
);
  const { publicKey: fromPublicKey, signTransaction } = useWallet();


  const tokenAddress = "63MirA7Z4FzyQXFzbZ4GwKV8mDEEixJBCZAZu6BNhA8B"

  const toAddress = "77nQG3QjjiYsgXP9N7wALqaC9PB62BykdkLADyhWHapC"

  const TokenAddress = new PublicKey(tokenAddress);
  const recipientAddress = new PublicKey(toAddress);

  //creating Keypair from an existing private key

  //Add Recipient Acct to ass

  // async function checkBalance(fromPublicKey) {
  //   if (fromPublicKey != null) {
  //     const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  // const tokenAccounts = await connection.getTokenAccountsByOwner(
  //   new PublicKey('2Xth4mcDfCiJpQphkKUY5ASz8HZgEnrH5XtfZQzi9zdr'),
  //   {
  //     programId: TOKEN_PROGRAM_ID,
  //   }
  // );

  // console.log("Token                                         Balance");
  // console.log("------------------------------------------------------------");
  // tokenAccounts.value.forEach((tokenAccount) => {
  //   const accountData = AccountLayout.decode(tokenAccount.account.data);
  //   console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
  // })
  //   }
    
  // }
  


  const sendToken = async () => {

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromPublicKey,
      TokenAddress,
      fromPublicKey,
      signTransaction
    );
    
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromPublicKey,
      TokenAddress,
      recipientAddress,
      signTransaction
    );

    const transaction = new SolanaWeb3.Transaction().add(
      createTransferInstruction( // imported from '@solana/spl-token'
          fromTokenAccount.address,
          toTokenAccount.address,
          fromPublicKey,
          parseInt(1 * Math.pow(10, 9)), // tokens have 6 decimals of precision so your amount needs to have the same
          [],
          TOKEN_PROGRAM_ID // imported from '@solana/spl-token'
      )
  );
  
  // set a recent block hash on the transaction to make it pass smoothly
  const latestBlockHash = await connection.getLatestBlockhash();
  transaction.recentBlockhash = latestBlockHash.blockhash;
  
  // set who is the fee payer for that transaction
  transaction.feePayer = fromPublicKey;
  
  // sign the transaction using the signTransaction method that we got from the useWallet hook above
  const signed = await signTransaction(transaction);
  
  // send the signed transaction
  const signature = await connection.sendRawTransaction(signed.serialize());
  
  // wait for a confirmation to make sure it went to the blockchain (optional)
  await connection.confirmTransaction({
      signature,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      blockhash: latestBlockHash.blockhash,
  });

   
    alert("Successfull transaction");
  }
  return <button onClick={() =>sendToken()}>Send Token</button>;
};

// 👇️ named exports
export { SubmitButton };