import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import useAuth from "../../custom-hooks/useAuth";
import { v4 as uuid } from "uuid";

const Ordersuccess = () => {
  const dispatch = useDispatch();
  const [t, st] = useState();
  const userID = useAuth().currentUser.uid;
  console.log("USREID", userID);
  const cart = useSelector((state) => state.cart);
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  useEffect(() => {
    st(userID);
  }, [userID]);

  //DATE
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;


  const sendCartData = async () => {
    if (cart.items.length > 0 && userID) {
      const cartRef = doc(db, "orders", small_id);
      const payload = {
        uid: userID,
        orderNumber: small_id,
        status: "pending",
        items: cart.items,
        totalAmount: cart.totalAmount,
        totalQuantity: cart.totalQuantity,
        date: currentDate,
      };
      await setDoc(cartRef, payload, { merge: true });
    }
  };

  useEffect(() => {
    if (t) {
      sendCartData();
      dispatch(clearCart());
    }
  }, [t]);

  return (
    <div className="flex-col text-center  mt-20">
      <h3>Your order has been placed Successfully.</h3>
      <Link to="/shop">
        <button className="bg-black border-2 border-black px-10 py-1 text-white mt-10">
          Shop More
        </button>
      </Link>
    </div>
  );
};

export default Ordersuccess;
