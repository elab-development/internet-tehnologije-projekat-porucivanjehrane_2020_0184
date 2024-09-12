import {ethers} from "ethers";
import {contractABI} from "./contractABI";

const CONTRACT_ADDRESS = "0x540d7E428D5207B30EE03F2551Cbb5751D3c7569";

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

export const sendTransaction = async(signer, amountInEther) => {
    console.log("Iznos ",amountInEther);
    const tx = {
        to: CONTRACT_ADDRESS,
        value: ethers.parseEther(amountInEther)
    };

    try {
        const transaction = await signer.sendTransaction(tx);
        const receipt = await transaction.wait(); // Čekanje potvrde transakcije
        console.log("Transaction successful", receipt);
        return receipt; // Vraća receipt kao povratnu vrednost
    } catch (error) {
        console.error("Transaction failed: ", error);
        throw error; // Bacanje greške da bi pozivalac mogao da je uhvati
    }
}
