import React from "react";
import { useState } from "react";
import Productlist from "../components/UI/Productlist";
import { Helmet } from "react-helmet";
import Commonsection from "../components/UI/Commonsection";
import Footer from "../components/UI/Footer/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";

//data to sort for select map
const sortOptions = [
  { label: "Filter", value: "" },
  { label: "Sofa", value: "sofa" },
  { label: "chair", value: "chair" },
  { label: "bed", value: "bed" },
];

const Shop = () => {
  const [filteredItem, setFilteredItem] = useState([]); //store filtered products only
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    setFilteredItem(products);
  }, [products]);

  // handle the sort by category
  const handleSortByCategory = (e) => {
    const filteredItems = products.filter((item) =>
      item.productName.toLocaleLowerCase().includes(e.target.value)
    );
    setFilteredItem(filteredItems);
  };

  //to filter data from search bar
  const filterData = (e) => {
    if (e.target.value.length === 0) {
      setFilteredItem(products);
    } else {
      const filterData = products.filter(
        (item) =>
          item.productName.toLocaleLowerCase().includes(e.target.value) ||
          item.category.toLocaleLowerCase().includes(e.target.value)
      );
      console.log(filterData);
      setFilteredItem(filterData);
      console.log(e.target.value);
    }
  };

  return (
    <>
      <Helmet>
        <title>Beds & Bunks - Shop</title>
      </Helmet>
      <Commonsection />
      <div className="sm:flex text-center justify-center gap-2 mt-8">
        <input
          type="text"
          className="border-2 rounded p-1 font-thin outline-none px-5"
          placeholder="Search"
          onChange={filterData}
        />
        <div className="flex justify-center mt-2 sm:mt-0 gap-1">
          <div>
            <select
              className="bg-gray-800 rounded-sm text-white text-sm font-thin p-2"
              onChange={handleSortByCategory}
              id="sort"
            >
              {sortOptions.map((item,index) => {
                return (
                  <option value={item.value} className="text-sm font-thin" key={index}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div></div>
        </div>
      </div>

      {filteredItem.length < 1 && !loading ? (
        <p className="text-center mt-20">
          Sorry can't find anu product right now.
        </p>
      ) : (
        <Productlist data={filteredItem} />
      )}

      <Footer />
    </>
  );
};

export default Shop;
