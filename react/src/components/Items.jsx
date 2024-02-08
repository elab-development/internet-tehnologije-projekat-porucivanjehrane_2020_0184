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
  const [exchangeRate, setExchangeRate] = useState(0); // Dodamo state za kurs
  const [valuta, setValuta] = useState("RSD");
  const [originalItems, setOriginalItems] = useState([]); // Dodamo state za originalne cene
  const [clicked, setClicked] = useState(false);

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
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/EUR"
        );
        const rate = response.data.rates.RSD;
        console.log(rate); // ispisuje u konzoli trenutni kurs za evro
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  const handleConvertToEurClick = () => {
    // Implementacija konverzije cena proizvoda u evre
    if (clicked == false) {
      const convertedItems = items.map((item) => {
        const priceInEur = (item.price / exchangeRate).toFixed(2); // Zaokružujemo na dvije decimale
        setValuta("EUR");
        return { ...item, price: priceInEur };
      });
      setItems(convertedItems);
      setClicked(true); // ako je korisnik vec jednom kliknuo na dugme za konvertovanje u EUR, onda ne moze to ponovo da uradi
      // ako ne bi ovo postojalo, onda bi korisnik mogao vise puta da klikne na dugme, i cena bi se stalno menjala
    }
  };

  const handleConvertToDinClick = () => {
    // Vraćanje cena proizvoda u dinare
    setItems(originalItems);
    setValuta("RSD");
    setClicked(false);
    // ako korisnik klikne na dugme da se vrate cene u RSD, to znaci da moze ponovo da klikne na dugme za konvertovanje
    // cena u EUR, ako to zeli
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={handleConvertToEurClick}>Konvertuj cene u EUR</button>
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
