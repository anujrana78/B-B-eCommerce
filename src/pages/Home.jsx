import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import heroimage from "../assets/images/bed-hero.png";
import saleImage from "../assets/images/double-sofa-02.png";
import Services from "../components/services/Services";
import Productlist from "../components/UI/Productlist";
import { motion } from "framer-motion";
import Footer from "../components/UI/Footer/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const productData = useSelector((state) => state.products.items);
  const [filtereData, setFilteredData] = useState([]);
  const [fiveStarProduct, setFiveStarProduct] = useState([]);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    //Filter data acc to the category or rating
    const filteredata = productData.filter(
      (item) => item?.category === "chair"
    );
    const filteredFiveStarProduct = productData?.filter(
      (item) => Number(item?.avgRating) === 5
    );
    const filteredBeds = productData?.filter(
      (item) => item?.category === "bed"
    );
    setFilteredData(filteredata);
    setFiveStarProduct(filteredFiveStarProduct);
    setBeds(filteredBeds);
  }, [productData]);

  return (
    <>
      <Helmet>
        <title>Beds & Bunks - Home</title>
      </Helmet>
      <section className="md:flex lg:px-24  md:py-14 bg-blue-200 px-5 ">
        <img src={heroimage} alt="Bed" className="md:w-[50%] md-h-[10%] "></img>
        <div className="sm:p-10 sm:flex-col py-5">
          <p className="text-gray-400 text-sm my-2 font-light ">
            Trending beds in 2022
          </p>
          <h1 className="sm:text-4xl hero-header sm:font-bold text-2xl font-semibold">
            Rest Easy, Dream Big. Find Your Perfect Bed Today
          </h1>
          <p className="text-gray-500 font-thin mb-3 mt-3">
            Discover the ultimate sanctuary for your dreams. Shop our collection
            of luxurious beds today and experience a good night's sleep like
            never before.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{
                scale: 1.04,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white px-5 py-2 rounded font-light"
            >
              Shop Now
            </motion.button>
          </Link>
        </div>
      </section>

      <Services />

      <section className=" flex-col items-center justify-center ">
        <h2 className="text-2xl text-center font-semibold mt-5">
          Premium Woods
        </h2>
        <Productlist data={filtereData} />
      </section>

      <section className=" flex-col items-center justify-center ">
        <h2 className="text-2xl text-center font-semibold mt-10">
          Customer's Choice
        </h2>
        <Productlist data={fiveStarProduct} />
      </section>

      <section className="  bg-indigo-900 md:px-[10%] mt-10 md:flex">
        <div className="p-10 text-white">
          <p className="font-thin text-sm text-gray-300 text-center text-[10px] md:text-left">
            Attention of Living Room
          </p>
          <h3 className="text-4xl mt-3 text-center md:text-left">Karen Sofa</h3>
          <p className="text-sm my-4 md:w-[80%] font-thin text-justify">
            Introducing the ultimate in comfort and style - the sofa. Whether
            you're lounging solo or entertaining guests, our sofas offer the
            perfect seating solution for any space. Sink into plush cushions and
            enjoy the support of sturdy frames, designed to last for years to
            come.
          </p>
          <motion.button
            whileHover={{
              scale: 1.03,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="sm:w-auto w-[100%] rounded-[5px] bg-opacity-100 text-white border-white border-[1px] text-sm p-2 hover:bg-white hover:text-indigo-900 "
          >
            View Product
          </motion.button>
        </div>
        <img
          src={saleImage}
          className="sm:h-[300px] mt-[-70px] sm:mt-[5px]"
          alt="chair"
        ></img>
      </section>

      <section className=" flex-col items-center justify-center ">
        <h2 className="text-2xl text-center font-semibold mt-10">
          Luxury Beds
        </h2>
        <Productlist data={beds} />
      </section>
      <Footer />
    </>
  );
};

export default Home;
