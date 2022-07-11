import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
export const TransferContext  = React.createContext();
const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

const TransferProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");

    const viewAllCars = async () => {
        try {
            if(ethereum) {
                const transactionsContract = createEthereumContract();
                await transactionsContract.setCar();
                const availableTransactions = await transactionsContract.viewAllCars();
                console.log("setcar", availableTransactions);
            } else {
                console.log("Ethereum is not present");
              }
        } catch(error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
            viewAllCars();

          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
          console.log("thang",accounts[0]);
          setCurrentAccount(accounts[0]);
          window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    
    useEffect(() => {
        checkIfWalletIsConnect();
    }, [currentAccount]);  

    return (
        <TransferContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TransferContext.Provider>
    );
}



export default TransferProvider;