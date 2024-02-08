import React, { useEffect, useState } from "react";
import OneItem from "./OneItem";
import axios from "axios";
import ButtonToTop from "./ButtonToTop";
import { useParams } from "react-router-dom";
import useScrollToTop from "./useScrollToTop";
import Cart from "./Cart";

function Items({ cartNum, setCartNum }) {
  const [items, setItems] = useState([]);
  const { id: restaurantId } = useParams();
  const [cart, setCart] = useState([]); // Stanje za korpu
  const [valuta, setValuta] = useState("RSD");
  const [originalItems, setOriginalItems] = useState([]); // Dodamo state za originalne cene
  const [clicked, setClicked] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Dodamo state za izabranu valutu
  const [exchangeRateEUR, setExchangeRateEUR] = useState(0); // Dodamo state za kurs evra
  const [exchangeRateUSD, setExchangeRateUSD] = useState(0); // Dodamo state za kurs dolara
  const [isConverted, setIsConverted] = useState(false); // Stanje za praćenje da li je konverzija izvršena

  useScrollToTop();

  const onAdd = (item) => {
    setCartNum((previousNumber) => previousNumber + 1);
    setCart([...cart, item]);
  };

  const onRemove = (item) => {
    if (cartNum > 0) {
      setCartNum((previousNumber) => previousNumber - 1);
    }

    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id); // Filtriramo proizvode iz korpe
    console.log(updatedCart);
    setCart(updatedCart);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/restaurant/${restaurantId}/items`
        );
        console.log(response.data.data);
        setItems(response.data.data);
        setOriginalItems(response.data.data); // Postavljamo originalne cene prilikom prvog učitavanja
      } catch (error) {
        console.error("Error while loading items for a restaurant:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const responseEUR = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/EUR"
        );
        const rateEUR = responseEUR.data.rates.RSD;
        setExchangeRateEUR(rateEUR);

        const responseUSD = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const rateUSD = responseUSD.data.rates.RSD;
        setExchangeRateUSD(rateUSD);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvertToCurrencyClick = () => {
    // Implementacija konverzije cena proizvoda u odabranu valutu
    if (!clicked) {
      let convertedItems;
      if (selectedCurrency === "EUR") {
        convertedItems = items.map((item) => {
          const priceInEur = (item.price / exchangeRateEUR).toFixed(2); // Zaokružujemo na dve decimale
          return { ...item, price: priceInEur };
        });
      } else if (selectedCurrency === "USD") {
        convertedItems = items.map((item) => {
          const priceInUsd = (item.price / exchangeRateUSD).toFixed(2); // Zaokružujemo na dve decimale
          return { ...item, price: priceInUsd };
        });
      }
      setItems(convertedItems);
      setValuta(selectedCurrency);
      // setClicked(true);
      setIsConverted(true);
    }
  };
  const handleConvertToDinClick = () => {
    // Vraćanje cena proizvoda u dinare
    setItems(originalItems);
    setValuta("RSD");
    setClicked(false);
    // ako korisnik klikne na dugme da se vrate cene u RSD, to znaci da moze ponovo da klikne na dugme za konvertovanje
    // cena u EUR, ako to zeli
    setIsConverted(false);
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      <div className="button-container">
        {!isConverted && (
          <>
            <button onClick={handleConvertToCurrencyClick}>
              Konvertuj cene
            </button>
            <select value={valuta} onChange={handleCurrencyChange}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </>
        )}

        <button onClick={handleConvertToDinClick}>Vrati cene u RSD</button>
      </div>
      <div className="all-items">
        {items?.map((i) => (
          <OneItem
            item={i}
            key={i.id}
            onAdd={() => onAdd(i)}
            onRemove={() => onRemove(i)}
            inCart={1}
            valuta={valuta}
          />
        ))}
        <ButtonToTop />
        <Cart cartNum={cartNum} cart={cart} />
      </div>
    </div>
  );
}

export default Items;
