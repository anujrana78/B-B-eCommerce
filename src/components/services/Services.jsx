import React from "react";
import { MdOutlineLocalShipping, MdAddCall } from "react-icons/md";
import { BsFillBoxFill } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { motion } from "framer-motion"


// Creating services array for mimizing the code 
const services = [
  {
    title: "Free Shipping",
    desc: "Deliver all over the country",
    icon: (
      <MdOutlineLocalShipping className="bg-black text-white rounded-full text-5xl mr-2 p-1" />
    ),
    bg : "bg-green-100"
  },
  {
    title: "Secured Payment",
    desc: "secure payment options ",
    icon: (
      <RiSecurePaymentFill className="bg-black text-white rounded-full text-5xl mr-2 p-1" />
    ),
    bg : "bg-red-100"
  },
  {
    title: "Easy Retrun ",
    desc: "30-Day return policy",
    icon: (
      <BsFillBoxFill className="bg-black text-white rounded-full text-5xl mr-2 p-1" />
    ),
    bg : "bg-yellow-100"
  },
  {
    title: "Support",
    desc: "On Call demand support",
    icon: (
      <MdAddCall className="bg-black text-white rounded-full text-5xl mr-2 p-1" />
    ),
    bg : "bg-pink-100"
  },
];

const Services = () => {
  return (
    <div className='sm:flex justify-center items-center sm:my-20 sm:gap-2 md:px-28 p-3 sm:flex-wrap'>
      {services.map((item, index) => {
        return (
            <motion.button
            whileHover={{
              scale: 1.03,
              transition: { duration: 1 },
            }} 
            whileTap={{ scale: 0.9 }}
            className={`flex justify-center items-center rounded p-8 sm:w-[20%] ${item.bg} w-[100%] mt-2 sm:first-letter sm:flex-[40%] md:flex-auto`}
            key={index}
          >
          
            <div>{item.icon}</div>
            <div className="text-left ">
              <h3 className="font-bold">{item.title}</h3>
              <p className="font-thin text-sm">{item.desc}</p>
            </div>
          </motion.button>
        );
      })}
   
    </div>
  );
};

export default Services;
