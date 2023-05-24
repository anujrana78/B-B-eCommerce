import React from "react";
import AccountCard from "./AccountCard";
import { useState } from "react";
import useAuth from "../../custom-hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";

const PersonalInformation = () => {
  const user = useAuth();
  const userID = user.currentUser.uid;
  const [userInfo, setUserInfo] = useState();

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

  return (
    <>
      <div className="sm:ml-10">
        <h2 className="text-left mb-4">Personal Information</h2>
        <div className=" flex-col">
          <AccountCard title={"Name"} desc={userInfo?.displayName} />
          <AccountCard title={"Email"} desc={userInfo?.email} />
          <AccountCard title={"Contact"} desc={userInfo?.contact} />
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
