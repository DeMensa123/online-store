import Products from "./components/Products";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Order from "./components/Order";
import React, { useState, useEffect } from "react";

function App() {
  // const [data, setData] = useState([]);
  const data = require("./data/products.json"); // import products
  const cart = useSelector((state) => state);
  const dispatch = useDispatch();

  const total = cart
    ? cart.reduce(
        (total, currentValue) =>
          (total = total + currentValue.qty * currentValue.unit_price_incl_vat),
        0
      )
    : 0;

  const total_ex_vat = cart
    ? cart.reduce(
        (total_ex_vat, currentValue) =>
          (total_ex_vat =
            total_ex_vat +
            ((currentValue.qty * currentValue.unit_price_incl_vat) /
              (currentValue.vat_category + 100)) *
              100),
        0
      )
    : 0;

  // // Loading data from server
  // const getProducts = () => {
  //   fetch("http://localhost:5000/products", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       console.log(myJson);
  //       setData(myJson);
  //     });
  // };
  // useEffect(() => {
  //   getProducts();
  // }, []);

  const [order, setOrder] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);

  // clear all items from the shopping cart and display the content in the console
  const onSendOrder = () => {
    setOrder(cart);
    setOrderTotal(total);
    dispatch({ type: "DELETE", payload: cart });
  };

  return (
    <>
      <div className="container mx-auto mt-12 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route
            path="/products"
            element={<Products products={data} />}
          ></Route>
          <Route
            path="/cart"
            element={
              <Cart
                total={total}
                total_ex_vat={total_ex_vat}
                onSendOrder={onSendOrder}
              />
            }
          ></Route>
          <Route
            path="/order"
            element={<Order cartItems={order} total={orderTotal} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
