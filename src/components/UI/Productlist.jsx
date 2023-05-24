import React from "react";
import Productcard from "./Productcard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Ring } from "@uiball/loaders";

const Productlist = ({ data }) => {
  const loading = useSelector((state) => state.products.loading);

  return (
    <div className="sm:flex   px-[15%] py-[2%] sm:flex-wrap sm:items-center sm:justify-start sm:gap-2 justify-center">
      {loading && 
      <div className="flex justify-center items-center w-[100%]">
      <Ring size={40} lineWeight={5} speed={2} color="black" />
      </div>
      }
      {data.map((item, index) => {
        return (
          <Productcard
            id={item.id}
            imgUrl={item.imgUrl}
            title={item.productName}
            category={item.category}
            price={item.price}
            key={item.id}
            avgRating={item.avgRating}
            className="h-[3px]"
            favStatus={item.favStatus}
          />
        );
      })}
    </div>
  );
};

export default Productlist;
