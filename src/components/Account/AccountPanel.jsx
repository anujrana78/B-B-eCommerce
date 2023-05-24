import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import Commonsection from "../../components/UI/Commonsection";
import { toast } from "react-toastify";
import AccountCard from "./AccountCard";
import PersonalInformation from "./PersonalInformation";
import MyOrder from "./MyOrder";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const AccountPanel = () => {
  const user = useAuth();
  const userID = user.currentUser.uid;
  const [userInfo, setUserInfo] = useState();
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState();
  const [infoActive, setInfoActive] = useState(true);
  const [orderActive, setOrderActive] = useState(false);
  const navigate = useNavigate();

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

  const editUserInformation = async () => {
    try {
      const cityRef = doc(db, "users", userID);
      await setDoc(cityRef, { contact }, { merge: true });
      setEdit((prevState) => !prevState);
      getUserInfo();
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast("Logout Sucessfull"); 
        navigate("/home");
      })
      .catch((error) => {
        console.log("Log out", error);
      });
  };

  return (
    <div className="mon">
      <Commonsection />
      <div className=" px-[2%] sm:px-[10%]">
        <div className="flex  justify-between mt-5 border-b-2 pb-6 border-gray-500">
          <h2 className="text-xl">My Account</h2>
          <button
            className="bg-red-700 text-white font-extralight text-[10px] px-2 rounded-sm"
            onClick={logout}
          >
            Log Out
          </button>
        </div>

        <div className="p-6 gap-2  sm:flex ">
          <div className="text-center mb-4">
            <img
              src={user.currentUser.photoURL}
              alt="profile"
              className="w-40 h-40 rounded-[200px] m-auto"
            />

            <p className="text-black font-bold mon">
              {" "}
              {`${userInfo?.displayName}`}
            </p>
            <p className="text-gray-400 mon">{`${userInfo?.email}`}</p>
            <div className="mt-4 text-left flex sm:flex-col gap-4">
              <p
                className=" hover:cursor-pointer"
                onClick={() => {
                  setInfoActive(true);
                  setOrderActive(false);
                }}
                style={
                  infoActive
                    ? { color: "red", borderBottom: "2px solid red" }
                    : { color: "" }
                }
              >
                Personal Information
              </p>
              <p
                className=" hover:cursor-pointer"
                onClick={() => {
                  setOrderActive(true);
                  setInfoActive(false);
                }}
                style={
                  orderActive
                    ? { color: "red", borderBottom: "2px solid red" }
                    : { color: "" }
                }
              >
                My Orders
              </p>
            </div>
          </div>
          {infoActive && <PersonalInformation />}
          {orderActive && <MyOrder />}
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
