import Commonsection from "../components/UI/Commonsection";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Footer from "../components/UI/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../redux/slices/cartSlice";
import useAuth from "../custom-hooks/useAuth";


const ProductDetails = () => {
  const dispatch = useDispatch();


  const products = useSelector(state => state.products.items)
  const loading = useSelector(state => state.products.loading)
  const [tab, setTab] = useState("desc");
  const isLoggedin = useAuth().currentUser;
  const [rating,setRating] = useState();
  const [reviewText,setReviewText] = useState();

  const productID = useParams().productId;
  let selectedProduct;

     selectedProduct = products?.find((item) => item.id === productID);

  const addToCart = () => { const {
    id,
    productName,
    category,
    description,
    imgUrl,
    price,
    reviews,
    shortDesc,
    avgRating,
  } = selectedProduct;
    dispatch(
      add({
        id,
        productName,
        category,
        description,
        imgUrl,
        price,
        reviews,
        shortDesc,
        avgRating,
      })
    );
  };

  const toggleDescTab = () => {
    setTab("desc");
  };
  const toggleReviewTab = () => {
    setTab("rev");
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const firstExample = {
    size: 20,
    value: selectedProduct?.avgRating,
    edit: false,
  };
  

  const sendReview = async () => {
    const reviewLength = selectedProduct?.reviews.length;
    
    try {
      const response = await fetch(
        `https://bed-and-bunk-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productID}/reviews/${reviewLength }.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            rating: rating,
            text: reviewText
          }),
        }
      );alert("Review Sent")
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
      <>
        <Commonsection />
        <div className="mt-10 mx-9 sm:flex sm:mx-[15%]">
          <div>
            <div className="h-[200px] object-cover sm:w-[300px] sm:h-[300px] ">
              <img
                src={selectedProduct?.imgUrl}
                className="rounded-sm  h-[100%] w-[100%] "
                alt="product"
              ></img>
            </div>
          </div>
          <div className="mt-8 sm:ml-20 sm:mt-0">
            <h2 className="text-[16px] font-merriweather sm:text-[28px]">
              {selectedProduct?.productName}
            </h2>
            <p className="text-gray-400 text-[12px] font-poppins text-justify mt-[10px]">
              {selectedProduct?.shortDesc}
            </p>

            <div className="flex mt-[18px] gap-4 items-center">
              <div className="flex gap-1">
                <ReactStars {...firstExample} />
              </div>
              {selectedProduct?.reviews.length >= 1 && <span className="text-sm text-gray-500">({selectedProduct?.reviews.length})</span>}
            </div>

            <p className="text-[10px] text-gray-500 mt-2">
              Catrgory : {selectedProduct?.category}
            </p>

            <div>
              <h2 className="font-merriweather font-bold mt-[10px]">
                Rs. {selectedProduct?.price}
              </h2>
            </div>
            <div className="cta flex items-center gap-1 mt-[10px]">
              <button
                className="border-2 border-black text-[14px] px-[24px] py-[8px] font-poppins hover:bg-black hover:text-white transition-all "
                onClick={addToCart}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-9 sm:mx-[15%] sm:mt-16">
          <div className="flex gap-2 items-center mt-[32px]">
            <h4
              className="text-md hover:cursor-pointer text-gray-300"
              onClick={toggleDescTab}
              style={{ color: tab === "desc" ? "black" : "" }}
            >
              Description
            </h4>
            <h4
              className="text-md hover:cursor-pointer text-gray-300"
              onClick={toggleReviewTab}
              style={{ color: tab === "rev" ? "black" : "" }}
            >
              {" "}
              Review ({selectedProduct?.reviews.length})
            </h4>
          </div>
          {tab === "desc" ? (
            <div className="mt-4">
              <p className="font-poppins text-[12px] text-justify">
                {selectedProduct?.description}
              </p>
            </div>
          ) : (
            <>
              {isLoggedin && (
                <div className="mt-4">
                  <h2 className=" text-sm">Share your Experience</h2>
                  <input
                    type="text"
                    className="border-2 border-gray-400 rounded-sm block w-[100%] px-2 text-sm mt-2 py-1 outline-none"
                    placeholder="Enter Your Name"
                  />
                  <input
                    type="text"
                    className="border-2 border-gray-400 block w-[100%] pb-16 px-2 text-sm mt-2 outline-none"
                    placeholder="Your review"
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <button
                    className="bg-gray-700 text-white text-sm font-thin px-2 py-1 mt-3"
                    onClick={sendReview}
                  >
                    Submit
                  </button>
                </div>
              )}

             {selectedProduct?.reviews.map((item,index) => {
                return (
                  <div className="mt-6" key={index}>
                    {<h3>User</h3>}
                    <span className="text-yellow-500">
                      {item?.rating} (rating) 
                    </span>
                    <p className="font-poppins text-[12px] text-justify">
                      {item?.text}
                    </p>
                  </div>
                );
              })} 
            </>
          )}
        </div>
        <Footer />
      </>
  );
};

export default ProductDetails;
