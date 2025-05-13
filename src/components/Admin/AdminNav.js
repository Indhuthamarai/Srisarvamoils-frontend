import React from "react";
import "../../css/Navbar1.css";
import { NavLink, Outlet } from "react-router-dom";
import logo1 from "../../assets/logo1b.png";
import { useNavigate } from "react-router";
import { useUserAuth } from "../UserAuthContext";
export default function AdminNav(){
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        // console.log(error.message);
      }
    };  
    return(
        <>
        <header>
        <div class="container-fluid">

            <div class="navb-logo">
                <img src={logo1} alt="Logo" />
            </div>

            <div class="navb-items nav-items d-none d-xl-flex">

                <div class="item">
                    <NavLink to="/form"  >Add&nbsp;Product</NavLink>
                </div>

                <div class="item">
                    <NavLink to="/viewproduct"  >Edit&nbsp;Product</NavLink>
                </div>

                <div class="item">
                    <NavLink to="/order" >Orders</NavLink>
                </div>
                <div class="item">
    <NavLink to="/report">Report</NavLink> {/* ✅ New */}
  </div>
                <div className="item1" style={{marginLeft:"50px"}}>
                <button type="button" className="btn btn-danger" onClick={handleLogout} style={{fontSize:"20px",paddingLeft:"20px",paddingRight:"20px"}}>Logout</button>
                </div>
            </div>

        </div>
        <div class="mobile-toggler d-xl-none">
                        <a href="/home" data-bs-toggle="modal" data-bs-target="#navbModal">
                        <i class="fa fa-solid fa-bars fontbars"></i>
                        </a>
                    </div>


                    <div class="modal fade" id="navbModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-header">
                                    <img src={logo1} alt="Logo" />
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-xmark"></i></button>
                                </div>

                                <div class="modal-body">

                                    <div class="modal-line">
                                    <i class="fa fa-plus" aria-hidden="true"></i><a href="/form">Add Product</a>
                                    </div>

                                    <div class="modal-line">
                                    <i class="fa-solid fa-droplet"></i> <a href="/viewproduct">View Products</a>
                                    </div>

                                    <div class="modal-line">
                                    <i class="fa-solid fa-phone"></i> <a href="/order">Orders</a>
                                    </div>

                                    <div class="modal-line">
  <i class="fa fa-bar-chart" aria-hidden="true"></i> <a href="/report">Report</a> 
</div>


                                    <a href="/" class="navb-button" type="button" onClick={handleLogout}>Logout</a>
                                </div>

                                
                            </div>
                        </div>
                    </div>

                
        </header>
        <Outlet/>
        {/* <h3 style={{textAlign:"center",color:"red",paddingTop:"15%",fontFamily:"Times New Roman', Times, serif",fontSize:"30px"}} >This page is maintained by admin</h3> */}
        </>
    );
}

// import React, { useState } from "react";
// import "../../css/Navbar1.css";
// import { NavLink, Outlet } from "react-router-dom";
// import logo1 from "../../assets/logo1b.png";
// import Axios from "axios";
// // import AdminNav from "./Admin/AdminNav"; // Assuming this is the admin navbar you want to use
// // import "../css/form.css";

// const url = "http://localhost:5000/api/products/add"; // Make sure this is your backend API endpoint for adding products

// export default function AddProductForm() {
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     stock: "",
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await Axios.post(url, product);
//       alert("Product added successfully!");
//       setProduct({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         stock: "",
//       });
//     } catch (err) {
//       alert("Failed to add product: " + err.response?.data?.message || err.message);
//     }
//   };

//   return (
//     <>
//       {/* <AdminNav /> */}
//       <h2 className="h2tag">Add New Product</h2>
//       <div className="maindiv">
//         <div className="container mt-3">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3 mt-3 ss__control">
//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="Enter name of the product"
//                 name="name"
//                 value={product.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3 mt-3 ss__control">
//               <label htmlFor="description">Description:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 placeholder="Enter product description"
//                 name="description"
//                 value={product.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3 mt-3 ss__control">
//               <label htmlFor="price">Price:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="price"
//                 placeholder="Enter price"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3 mt-3 ss__control">
//               <label htmlFor="category">Category:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="category"
//                 placeholder="Enter product category"
//                 name="category"
//                 value={product.category}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3 mt-3 ss__control">
//               <label htmlFor="stock">Stock:</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="stock"
//                 placeholder="Enter stock quantity"
//                 name="stock"
//                 value={product.stock}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary ss__control">
//               Add Product
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
