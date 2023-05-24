import React from "react";
import AccountCard from "./AccountCard";
import { useState } from "react";
import useAuth from "../../custom-hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Waveform } from "@uiball/loaders";
import { MdCancel } from "react-icons/md";

const MyOrder = () => {
  const user = useAuth();
  const userID = user.currentUser.uid;
  const [userInfo, setUserInfo] = useState();
  const [orders, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userID) {
      getUserInfo();
    }
  }, [userID]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    let arr = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().uid === userID) {
        arr.push(doc.data());
      }
    });
    setOrder(arr);
    setLoading(false);
  };

  useEffect(() => {
    if (userID) {
      getData();
    }
  }, [userID]);

  return (
    <div className="sm:ml-10 sm:w-[70%]">
      <p>My Order</p>

      {loading ? (
        <div className="flex w-[100%] justify-center items-center mt-[10%]">
          <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
        </div>
      ) : (
        <div className="  ">
          <div className="  ">
            {orders.map((item, index) => {
              return (
                <div
                  className="mt-5 p-3 w-[100%] justify-between bg-gray-100 rounded-sm"
                  key={index}
                >
                  <div className="flex justify-between">
                    <p className="text-[12px]">Order No : {item.orderNumber}</p>
                    {item.status === "pending" && <div className="flex text-[10px] items-center gap-1 border-black border-[1px] p-1 hover:cursor-pointer">
                      <MdCancel className="text-gray-500" />
                      <p>Cancel Order</p>
                    </div>}
                  </div>
                  <div>
                    {item.items.map((i, index) => {
                      return (
                        <div className="flex justify-between items-center">
                          <div className="flex mt-4" key={index}>
                            <div className="w-[15 %]">
                              <img
                                src={i.imgUrl}
                                alt="product"
                                className="h-20"
                              />
                            </div>
                            <div className="ml-[6%] mt-[2%]">
                              <h3>{i.productName}</h3>
                              <p className="text-[12px] text-gray-400">
                                Qty : {i.quantity}
                              </p>
                              <p className=" text-sm">Status : {item.status}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
