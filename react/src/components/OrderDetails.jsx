import React, { useState, useEffect } from "react";
import axios from "axios";
//import { ethers } from ethers;
import Swal from "sweetalert2";
import Button from "./Button";

function OrderDetails({ items, converted, totalPrice, exchangeRateEUR }) {

    const [ethSepoliaRate, setEthSepoliaRate] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);


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
            <Button text="Pay upon delivery" />
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
                <Button text="Pay now with MetaMask" />
            </div>
        </div>
    );
};

export default OrderDetails;

