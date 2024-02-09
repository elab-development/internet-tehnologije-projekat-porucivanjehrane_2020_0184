import React, { useEffect, useState } from "react";
import OneItem from "./OneItem";
import axios from "axios";
import ButtonToTop from "./ButtonToTop";
import { useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "./useScrollToTop";
import Cart from "./Cart";
import "../App.css";
import Button from "./Button";
import Swal from "sweetalert2";

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
  const [totalPrice, setTotalPrice] = useState(0);
  let navigate = useNavigate();

  const role = window.sessionStorage.getItem("role_id");
  const accessToken = window.sessionStorage.getItem("auth_token");
  const userId = window.sessionStorage.getItem("user_id");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  useScrollToTop();
  const refreshCart = () => {
    const newItems = items.filter((item) => item.amount > 0);
    setCart(newItems);
  };

  const onAdd = (id) => {
    items.map((item) => {
      if (item.id === id) {
        item.amount++;
        setCartNum(cartNum + 1);
        refreshCart();
        console.log("itemid: " + item.id + " amount: " + item.amount);
      }
    });
  };

  const onAddToOrder = async () => {
    try {
      // Pozovite rutu za kreiranje nove porudžbine na backend-u
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/api/orders/store",
        {
          payment_method: "cash_on_delivery",
          user_id: userId,
          restaurant_id: restaurantId,
        }, // Možete proslediti bilo kakve dodatne podatke za kreiranje porudžbine
        config
      );

      // Dobijanje ID nove porudžbine iz odgovora
      const newOrderId = orderResponse.data[1].id; // Prilagodite ovoj liniji prema strukturi odgovora koji vraća vaš backend
      console.log(newOrderId);
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

      // Osvežavanje korpe nakon uspješnog slanja proizvoda u korpi
      refreshCart();
      Swal.fire({
        icon: "success",
        title: "Order has been placed!",
      });
      navigate("/categories");
      setCartNum(0);
    } catch (error) {
      console.error("Error while adding item to cart:", error);
      // Obradite grešku ako je potrebno
    }
  };

  const onRemove = (id) => {
    items.map((item) => {
      if (item.id === id) {
        if (item.amount > 0) {
          item.amount--;
          setCartNum(cartNum - 1);

          refreshCart();
          console.log("itemid: " + item.id + " amount: " + item.amount);
        } else {
          console.log("Amount is already 0");
        }
      }
    });
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

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.amount;
    });
    return total.toFixed(2); // Zaokružite na dve decimale
  };
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

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
    setSelectedCurrency("EUR");
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // Dugmici za konvertovanje cena i vracanje cena se prikazuju samo onda kada je korpa prazna.
  return (
    <div>
      {cartNum == 0 && (
        <div className="button-container">
          {!isConverted && (
            <>
              <button onClick={handleConvertToCurrencyClick}>
                Show prices in:
              </button>
              <select
                className="select-currency"
                value={valuta}
                onChange={handleCurrencyChange}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </>
          )}
          {isConverted && (
            <>
              <button onClick={handleConvertToDinClick}>Show in RSD</button>
            </>
          )}
        </div>
      )}
      <div>
        <div className="all-items">
          {items?.map((i) => (
            <OneItem
              item={i}
              key={i.id}
              onAdd={() => onAdd(i.id)}
              onRemove={() => onRemove(i.id)}
              inCart={1}
              valuta={valuta}
            />
          ))}
          <ButtonToTop />
        </div>
        <div className="cart-container">
          {/* Samo logged in user-u se prikazuje korpa */}
          {role == "2" && (
            <>
              <Cart cartNum={cartNum} cart={cart} valuta={valuta} />
              {cartNum > 0 && (
                <>
                  <p
                    style={{
                      marginLeft: "20px",
                      fontSize: "30px",
                      fontWeight: "bold",
                      border: "2px dotted",
                      paddingLeft: "5px",
                    }}
                  >
                    {" "}
                    Total price: {totalPrice} {valuta}
                  </p>
                  <Button text="Place your order" onClick={onAddToOrder} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;
