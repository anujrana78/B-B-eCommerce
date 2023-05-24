// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { add } from "./cartSlice";
// import { db } from "../../firebase.config";

// export const fetchCartData = (userExist) => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const docRef = doc(db, "users", userExist);
//       const docSnap = await getDoc(docRef);

//       try {
//         if (docSnap.exists()) {
//           return docSnap.data();
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.log("", error);
//       }
//     };

//     try {
//       const cartData = await fetchData();

//       if (cartData.cart) {
//         dispatch(
//           add({
//             items: cartData.cart.items || [],
//           })
//         );
//         console.log("Cart Data", cartData);
//       } else {
//         alert("Doesnot exist");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const sendCartData = (cartData, userId) => {
//   return async () => {
//     alert("Second ");
//     const sendRequest = async () => {
//       const cartitems = JSON.parse(JSON.stringify(cartData.items));

//       const cartItem = {
//         items: cartitems,
//         totalQuantity: cartData.totalQuantity,
//         totalAmount: cartData.totalAmount,
//       };

//       const cartRef = doc(db, "users", userId.uid);
//       const payload = { cart: cartItem };
//       await setDoc(cartRef, payload, { merge: true });
//     };

//     try {
//       await sendRequest();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
