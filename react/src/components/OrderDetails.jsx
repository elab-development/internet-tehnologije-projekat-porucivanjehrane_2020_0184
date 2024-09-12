import React, { useState, useEffect } from "react";
import axios from "axios";
//import { ethers } from ethers;
import Swal from "sweetalert2";
import Button from "./Button";
import { connectMetaMaskWallet, interactWithContract, sendTransaction } from "../utils/ethereum";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetails({ cartNum, setCartNum, restaurantId, cart, items, converted, totalPrice, exchangeRateEUR }) {


    const [ethSepoliaRate, setEthSepoliaRate] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);

    const [signer, setSigner] = useState(null);

    const role = window.sessionStorage.getItem("role_id");
    const accessToken = window.sessionStorage.getItem("auth_token");
    const userId = window.sessionStorage.getItem("user_id");
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    // Dobijanje kursa 
    useEffect(() => {
        const fetchSepoliaETHRate = async () => {
            try {
                // Fetch Sepolia ETH to EUR exchange rate from CoinGecko
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
                );

                // Log the response for debugging
                console.log(response.data);

                // Assuming you're using Ethereum as a proxy for SepoliaETH
                const ethToEurRate = response.data.ethereum.eur;

                // Set the rate in the state for further usage in the component
                setEthSepoliaRate(ethToEurRate);
                console.log("Kurs:" + ethSepoliaRate);

            } catch (error) {
                console.error("Error fetching Sepolia ETH to EUR exchange rate:", error);
            }
        };

        // Call the function to fetch the rate
        fetchSepoliaETHRate();
    }, []);


    // Konvertovanje cene u ETH
    useEffect(() => {
        if (ethSepoliaRate) {

            if (!converted) {
                const priceEth = ((totalPrice / exchangeRateEUR) / ethSepoliaRate).toFixed(5);
                setEthPrice(priceEth)
            } else {
                const priceInEth = (totalPrice / ethSepoliaRate).toFixed(5);
                setEthPrice(priceInEth);
            }
        }
    }, [ethSepoliaRate, totalPrice]);


    const handlePayWithMetaMask = async () => {
        if (!signer) {
            const connectedSigner = await connectMetaMaskWallet();
            setSigner(connectedSigner);
        }
    
        if (signer) {
            try {
                // Prvo izvrši transakciju i dobije receipt
                const receipt = await sendTransaction(signer, ethPrice);
    
                // Provera statusa transakcije
                if (receipt.status === 1) {
                    // Transakcija je uspešna, kreiraj porudžbinu
                    const orderResponse = await axios.post(
                        "http://127.0.0.1:8000/api/orders/store",
                        {
                            payment_method: "paid_with_metamask",
                            user_id: userId,
                            restaurant_id: restaurantId,
                        },
                        config
                    );
        
                    // Dobijanje ID nove porudžbine iz odgovora
                    const newOrderId = orderResponse.data[1].id;
                    console.log("Porudžbina kreirana sa ID:", newOrderId);
        
                    // Slanje proizvoda u korpu na backend koristeći dobijeni ID porudžbine
                    await Promise.all(
                        cart.map(async (item) => {
                            const response = await axios.post(
                                "http://127.0.0.1:8000/api/order_items/store",
                                {
                                    order_id: newOrderId,
                                    item_id: item.id,
                                    quantity: item.amount,
                                },
                                config
                            );
                            console.log(response.data.message);
                        })
                    );
        
                    window.location.reload();
                    Swal.fire("Payment successful", "Your transaction was successful");
        
                    setCartNum(0);
                } else {
                    // Ako transakcija nije uspela, ne kreiraj porudžbinu
                    Swal.fire("Payment failed", "The transaction was rejected");
                }
            } catch (error) {
                console.error("Greška:", error.response ? error.response.data : error);
                Swal.fire("Payment failed", "An error occurred while processing your transaction");
            }
        }
    };
    
    

    return (
        <div>

            <>
                {items?.filter(i => i.amount > 0).map((i) => (
                    <div key={i.id}>
                        <p> {i.amount} x {i.name} </p>
                    </div>
                ))}
            </>
            {converted == true && (
                <>
                    <b><p> Total price: {totalPrice} EUR</p></b>
                </>

            )}
            {converted == false && (
                <>
                    <b><h3> Total price: {totalPrice} RSD</h3></b>

                </>
            )}

            <hr style={{ borderTop: "5px solid black" }}></hr>
            <p> You can pay right now in Ether (ETH) by using your MetaMask digital wallet.</p>
            <b><p> Current ETH-EUR rate: 1 ETH = {ethSepoliaRate} EUR</p></b>
            {converted == false && (
                <>
                    <p> Your price in RSD is converted to EUR, as it is right now only available to pay in Ether by using Eth-Eur rate.</p>

                    <b>
                        <p> Current EUR-RSD rate: 1 EUR = {exchangeRateEUR} RSD</p>
                        <p> Total price: {totalPrice} RSD</p>
                        <p> Your converted price: {(totalPrice / exchangeRateEUR).toFixed(3)} EUR</p>
                    </b>
                </>
            )}

            <h3> Total price: {ethPrice} ETH</h3>
            <div>
                <Button text="Pay now with MetaMask" onClick={handlePayWithMetaMask} />
            </div>
        </div>
    );
};

export default OrderDetails;

