import {ethers} from "ethers";
import {contractABI} from "./contractABI"; 

const CONTRACT_ADDRESS = "0x0498B7c793D7432Cd9dB27fb02fc9cfdBAfA1Fd3";

export const connectMetaMaskWallet = async() => {
    if(window.ethereum) {
        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();  
            return signer;
        } catch(error) {
            console.error("User rejected the request");
            return null;
        }
    } else {
        console.error("MetaMask not installed");
        return null;
    }
}

export const payForOrder = async(signer, amountInEther) => {
    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        
        console.log("Iznos: ", amountInEther);
        const transaction = await contract.payForOrder({
            value: ethers.parseEther(amountInEther)  
        });

        const receipt = await transaction.wait();
        console.log("Payment successful", receipt);
        return receipt; 
    } catch (error) {
        console.error("Payment failed: ", error);
        throw error; 
    }
}
