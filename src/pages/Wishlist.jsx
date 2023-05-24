import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/UI/Footer/Footer";
import Commonsection from "../components/UI/Commonsection";
import Productlist from "../components/UI/Productlist";

const Wishlist = () => {
  const wishlistItem = useSelector((state) => state.wishlist.items);
console.log("Wishlist", wishlistItem)

  return (
    <>
      <Commonsection />
      <h2 className="font-poppins text-3xl font-bold mt-10 mx-20">
        Wishlist ({wishlistItem.length})
      </h2>
      <Productlist data={wishlistItem} />
      <Footer />
      
    </>
  );
};

export default Wishlist;
