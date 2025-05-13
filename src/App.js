import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar2 from "./components/Navbar1";
import Home from "../src/components/Home";
import Products from "./components/Products";
import Contact from "../src/components/Contact";
import About from "../src/components/About";
import Login from "../src/components/Login";
import Signup from "../src/components/Signup";
import NoPage from "../src/components/NoPage";

import Cart from './components/Cart';
import Form from "./components/Admin/Form";
import "./index.css";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.js";

import { UserAuthContextProvider } from "./components/UserAuthContext";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminNav from "./components/Admin/AdminNav";
import ViewProducts from "./components/Admin/ViewProduct";
import Order from "./components/Admin/Order";
import BuyForm from "./components/BuyForm";
import Userorder  from "./components/userorder";

import { AuthProvider } from './contexts/authContext';
// import User from "../../server/model/user.js";
import Payment from "./components/Payment";
import OrderConfirmation from "./components/orderconfirm";
import Report from "./components/Admin/report";
function App() {
  
  const [cartItems,setCartItems]=useState([]);
 

const handleAddProduct = (product, silent = false) =>{
  console.log(product, "product check");
  if (!silent) {
    alert("Product added successfully"); // ✅ show alert only when not silent
  }
  

  const productExist = cartItems.find((item) => item._id === product._id);
  console.log("product id", product._id, productExist);

  if (productExist) {
    const updatedCart = cartItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
};


    // const handleRemoveProduct=(product)=>{
    //   const ProductExist=cartItems.find((item)=>item._id===product._id);
    //   if(ProductExist){
    //     setCartItems(cartItems.filter((item)=>item._id !==product._id));
    //   }else{
    //     setCartItems(
    //     cartItems.map((item)=>
    //       item._id===product._id
    //       ? { ...ProductExist,quantity:ProductExist.quantity-1}:item
    //     )

    //     );
    //   }
    // }
    const handleRemoveProduct = (item) => {
      if (item.decrementOnly) {
        setCartItems((prevItems) =>
          prevItems.map((i) =>
            i._id === item._id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
        );
      } else {
        setCartItems((prevItems) =>
          prevItems.filter((i) => i._id !== item._id)
        );
      }
    };
    const handlePrice=(price)=>{
      console.log(price);
    }

    

    const handleCartClearance=()=>{
      
      setCartItems([]);
    }
    



    
  return (
    <>
    <BrowserRouter>
    <UserAuthContextProvider>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navbar2 cartItems={cartItems} />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products  handleAddProduct={handleAddProduct}/>} loading />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="Login" element={<Login/ >}/>
          <Route path="Signup" element={<Signup/>}/>
          <Route path="cart" element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} handleCartClearance={handleCartClearance} handlePrice={handlePrice}/>}/>
          <Route path="*" element={<NoPage />} />
          <Route path="buyform" element={<BuyForm cartItems={cartItems} handlePrice={handlePrice}/>}/>
          <Route path="userorder" element={<Userorder/>}/></Route>
          <Route path="form" element={<ProtectedRoute><Form/></ProtectedRoute>} />
          <Route path="admin" element={<AdminLogin/>}/>
          <Route path="adminNav" element={<ProtectedRoute><AdminNav/></ProtectedRoute>}/>
          <Route path="viewproduct" element={<ProtectedRoute><ViewProducts/> </ProtectedRoute>}/>
          <Route path="order" element={<ProtectedRoute><Order/></ProtectedRoute>}/> 
          <Route path="payment" element={<Payment/>}/>
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/report" element={<Report/>}/>
        
      </Routes>
      </AuthProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
    
    </>
  );
}


export default App;
