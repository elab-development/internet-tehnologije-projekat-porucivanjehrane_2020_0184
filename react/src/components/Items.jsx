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
import OrderDetails from "./OrderDetails";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


function Items({ cartNum, setCartNum }) {
  const [items, setItems] = useState([]);
  const { id: restaurantId } = useParams();
  const [cart, setCart] = useState([]); // Stanje za korpu
  const [valuta, setValuta] = useState("RSD");
  const [originalItems, setOriginalItems] = useState([]); // Dodamo state za originalne cene
  const [clicked, setClicked] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR"); // Dodamo state za izabranu valutu
  const [exchangeRateEUR, setExchangeRateEUR] = useState(0); // Dodamo state za kurs evra
  const [isConverted, setIsConverted] = useState(false); // Stanje za praćenje da li je konverzija izvršena
  const [totalPrice, setTotalPrice] = useState(0);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  let navigate = useNavigate();

  const role = window.sessionStorage.getItem("role_id");
  const accessToken = window.sessionStorage.getItem("auth_token");
  const userId = window.sessionStorage.getItem("user_id");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // Povratak na vrh stranice
  useScrollToTop();
  const refreshCart = () => {
    const newItems = items.filter((item) => item.amount > 0);
    setCart(newItems);
  };

  // Dodavanje proizvoda u korpu
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

  // Funkcija za placanje pri dostavi
  const payUponDelivery = async () => {
    try {
      // Ruta za kreiranje nove porudžbine na backend-u
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/api/orders/store",
        {
          payment_method: "cash_on_delivery",
          user_id: userId,
          restaurant_id: restaurantId,
        },
        config
      );

      // Dobijanje ID nove porudžbine iz odgovora
      const newOrderId = orderResponse.data[1].id;
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

      // Osvežavanje korpe nakon uspešnog slanja proizvoda u korpi
      refreshCart();
      Swal.fire({
        icon: "success",
        title: "Order has been placed!",
      });
      navigate("/categories");
      setCartNum(0);
    } catch (error) {
      console.error("Error while adding item to cart:", error);
    }

  }


  // Funkcija za placanje putem digitalnog novcanika
  const onAddToOrder = async () => {

    MySwal.fire({
      title: 'Order summary',
      html: (
        <OrderDetails
          items={items}
          converted={isConverted}
          totalPrice={calculateTotalPrice()}
          exchangeRateEUR={exchangeRateEUR}
        // currency={currency}
        // onCashPayment={handleCashPayment}
        // onMetaMaskPayment={handleMetaMaskPayment}
        />
      ),
      showConfirmButton: false, // Onemogućavamo dugmad za SweetAlert, jer koristimo dugmad unutar komponente
    });
  };

  // Brisanje proizvoda iz korpe
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


  // Ucitavanje proizvoda konkretnog restorana
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

  // Ucitavanje trenutnog kursa RSD-EUR
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const responseEUR = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/EUR"
        );
        const rateEUR = responseEUR.data.rates.RSD;
        setExchangeRateEUR(rateEUR);


      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Racunanje ukupne cene
  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.amount;
    });
    return total.toFixed(2);
  };
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  // Konverzija cena u odgovarajucu valutu
  const handleConvertToCurrencyClick = () => {
    // Implementacija konverzije cena proizvoda u odabranu valutu
    if (!clicked) {
      let convertedItems;
      if (selectedCurrency === "EUR") {
        convertedItems = items.map((item) => {
          const priceInEur = (item.price / exchangeRateEUR).toFixed(2); // Zaokružujemo na dve decimale
          return { ...item, price: priceInEur };
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
    // Ako korisnik klikne na dugme da se vrate cene u RSD, to znaci da moze ponovo da klikne na dugme za konvertovanje
    // cena u EUR, ako to zeli
    setIsConverted(false);
    setSelectedCurrency("EUR");
  };
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleOrderPlaced = async (paymentMethod) => {
    console.log("radi");

  }

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
              <button onClick={handleConvertToDinClick}>Show prices in RSD</button>
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
                  <div>
                    {showOrderDetails ? (
                      <OrderDetails totalPriceRSD={totalPrice} onOrderPlaced={handleOrderPlaced} />
                    ) : (
                      <>
                        <div>
                          {/* Ostali sadržaj */}
                          <Button onClick={payUponDelivery} text={"Pay upon delivery"}></Button>
                          <Button onClick={onAddToOrder} text={"Pay now with MetaMask"}></Button>
                        </div>
                      </>
                    )}
                  </div>

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
