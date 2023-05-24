import React from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlist";
import useAuth from "../../custom-hooks/useAuth";

const Productcard = (product) => {
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(false);

  //To split the text
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };

  //to create toastify
  const notify = () => toast("Added to cart");

  //toget the uid of logged in user

  const addToCart = async () => {
    dispatch(
      add({
        id: product.id,
        imgUrl: product.imgUrl,
        productName: product.title,
        category: product.category,
        price: product.price,
      })
    );

    notify();
  };

  const addWishlist = () => {
    dispatch(
      addToWishlist({
        id: product.id,
        imgUrl: product.imgUrl,
        productName: product.title,
        category: product.category,
        price: product.price,
        favStatus: true,
      })
    );
    setIsFavourite(true);
  };

  const removeWishlist = () => {
    dispatch(removeFromWishlist(product.id));
    setIsFavourite(false);
  };

  //rating star
  const firstExample = {
    size: 15,
    value: product.avgRating,
    edit: false,
    isHalf: true,
  };

  return (
    <div className=" rounded-md shadow-md w-[250px] h-auto mt-2 sm:mt-auto ">
      <motion.button
        whileHover={{
          scale: 0.98,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className=" relative">
          <Link to={`/shop/${product.id}`}>
            <img
              src={product.imgUrl}
              alt="chair"
              className=" object-fill"
            ></img>
          </Link>
          <div className="bg-white rounded-full absolute top-2 right-2 p-1">
            {!isFavourite && !product.favStatus ? (
              <AiOutlineHeart className=" " onClick={addWishlist} />
            ) : (
              <AiFillHeart className="" onClick={removeWishlist} />
            )}
          </div>
        </div>
      </motion.button>
      <div className="p-3 flex-col h-[130px]">
        <div className="space-y-[2px]">
          <div className="flex justify-between items-center">
            <Link to={`/shop/${product.id}`}>
              <h3 className="text-[18px]  mon font-semibold">
                {truncateString(product.title, 10)}
              </h3>
            </Link>
            <p className="text-gray-500 text-xl font-bold mon sm:text-sm">
              Rs. {product.price}
            </p>
          </div>

          <p className="text-gray-500 text-[10px] font-thin ">
            {product.category}
          </p>
          <div className="flex">
            <ReactStars {...firstExample} />
          </div>
        </div>

        <button
          className="my-3 border-[1px] border-black text-[10px] px-3 py-1 rounded-full hover:bg-black hover:text-white"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productcard;
