import React from "react";
import { Route, Routes } from "react-router-dom";
import Loadable from "react-loadable";

import Header from "./components/Header/Header";
import Home from "./pages/Home";

import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart"),
  loading: () => <div>Загрузка корзины...</div>,
});

const NotFound = Loadable({
  loader: () => import(/*webpackChunkName: "Not found"*/ "./pages/NotFound"),
  loading: () => <div>Загрузка...</div>,
});

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
