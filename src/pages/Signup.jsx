import React, { useState, useEffect } from "react";
import titleImage from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase.config.js";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [contact, setContact] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, `images/${username}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              contact : contact,
              photoURL: downloadURL,
              cart: [],
            });
          });
        }
      );

      const user = userCredentials.user;

      notify("Account Created");
      navigate("/");
    } catch (error) {
      notify(error.code);
    }
  };

  return (
    <div className=" sm:flex sm:mx-[20%] justify-center sm:mt-10">
      <div className="w-[40%] hidden sm:block">
        <img src={titleImage} className="object-contain h-[100%] " alt=""></img>
      </div>
      <div className=" mt-6 px-8 font-poppins sm:bg-gray-100 sm:mt-0 pr-10 sm:pt-16">
        <h2 className="font-montserrat text-lg text-left font-semibold">
          Welcome to{" "}
          <span className="font-fasthand font-thin">Beds & Bunks</span>,<br />{" "}
          Sign Up to Create Account
        </h2>
        <p className="text-[10px] mt-3 ">
          Already have an account?{" "}
          <Link className="font-bold" to="/signin">
            <u>sign in </u>
          </Link>
          <br /> It takes less than a minute
        </p>
        <div className=" flex justify-center items-center mt-2">
          <form
            className="  w-[100%] m-auto font-montserrat mt-8"
            onSubmit={handleSubmit}
          >
            <label className="text-sm">Username</label>
            <input
              type="text"
              id="username"
              className="block  px-2 text-sm border-[1px] border-gray-300 rounded-sm font-thin p-1 outline-none w-[100%] mt-1 mb-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <label className="text-sm">Contact</label>
            <input
              type="number"
              id="contact"
              className="block  px-2 text-sm border-[1px] border-gray-300 rounded-sm font-thin p-1 outline-none w-[100%] mt-1 mb-2"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />

            <label className="text-sm ">Email</label>

            <input
              type="email"
              id="email"
              className="block  px-2 text-sm border-[1px] border-gray-300 rounded-sm font-thin p-1 outline-none w-[100%] mt-1 mb-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label className="text-sm">Password</label>
            <input
              type="password"
              id="password"
              className="block px-2 text-sm border-[1px] border-gray-300 rounded-sm font-thin p-1 outline-none w-[100%] mt-1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <p className="text-[10px] text-center mt-4">
              <u>Forgot Password?</u>
            </p>

            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            <button className="text-white bg-black px-2 py-2 rounded-sm w-[100%] mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
