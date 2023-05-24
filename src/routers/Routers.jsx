import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import ProtectedRouter from "./ProtectedRouter";
import Wishlist from "../pages/Wishlist";

import Cancel from "../pages/Cancel";
import { useSelector } from "react-redux";
import Account from "../pages/Account";
import Success from "../pages/Success";


const Routers = () => {
  return (
    <Routes>
      <Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Home />} />
        <Route path="/success" element={<ProtectedRouter> <Success /> </ProtectedRouter>}/>
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/account" element={<ProtectedRouter> <Account /></ProtectedRouter>} />

      </Route>
    </Routes>
  );
};

export default Routers;
