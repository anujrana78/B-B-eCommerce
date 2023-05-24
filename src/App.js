import { useEffect,useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Routers from "./routers/Routers";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchProduct } from "./redux/slices/productSlice";


function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routers />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
