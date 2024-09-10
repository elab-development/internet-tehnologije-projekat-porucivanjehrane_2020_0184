import {ethers} from "ethers";
import {contractABI} from "./contractABI";

const CONTRACT_ADDRESS = "0x5FD6eB55D12E759a21C09eF703fe0CBa1DC9d88D";

export const connectMetaMaskWallet = async() =>{
    if(window.ethereum){
        try {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            return signer;
        }catch(error){
            console.error("User rejected the request");
            return null;
        }
    }else{
        console.error("MetaMask not installed");
        return null;
    }
}

export const interactWithContract = async(signer, methodName, params = []) =>{
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    try{
        const result = await contract[methodName](...params);
        return result;
    }catch(error){
        console.error("Contract interaction failed: ", error);
        throw error;
    }
}

export const sendTransaction = async(signer, amountInEther) =>{
    const tx = {
        to: CONTRACT_ADDRESS,
        value: ethers.parseEther(amountInEther)
    };

    try{
        const transaction = await signer.sendTransaction(tx);
        await transaction.wait();
        console.log("Transaction successful", transaction);
    }catch(error){
        console.error("Transaction failed: ", error);
    }
}