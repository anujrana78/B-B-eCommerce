import React from "react";
import { BiBed } from "react-icons/bi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-gray-800 sm:mt-24 sm:px-20 sm:py-14 justify-center items-center gap-[2%] text-white sm:flex   pt-5 mt-10">
      <BiBed className="m-0 p-0 sm:text-[100px] sm:display-block hidden"/>
    
      <section className="sm:w-[40%] sm:border-r-[1px] p-3 h-[150px]">
      <h2 className="text-[30px] logo">
            Bed <span className="text-[16px]">&</span> Bunk
          </h2>
        <p className="font-thin mt-2 text-sm text-justify">
          Bed and Bunk is an ecommerce project created by
          <span className='font-bold text-xl'> Anuj Rana </span> for the final semester project. Please feel
          free to test the app.
        </p>
      </section>

      <section className="p-3 pr-20 border-r-[1px] h-[150px]">
        <h3 className="text-xl logo">Useful Links</h3>
        <ul className="text-sm mt-4 font-thin ">
          <li><Link to='/home'>Home </Link></li>
          <li><Link to='/shop'>Shop</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li>Privacy Policy</li>
        </ul>
      </section>

      <section className="p-3 pr-20 h-[150px] ">
        <h3 className="text-xl logo">Categories</h3>
        <ul className="text-sm mt-4 font-thin">
          <li>Sofa</li>
          <li>Chair</li>
          <li>Bean Bags</li>
        </ul>
      </section>
    </div>
  );
};

export default Footer;
