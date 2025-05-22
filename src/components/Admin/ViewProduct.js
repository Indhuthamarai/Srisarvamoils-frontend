// import React, { useState } from "react";
// import Axios from "axios";
// import "../../css/viewproduct.css";
// import logo1 from "../../assets/logo1b.png";
// import ScrollToTop from "../top.js";
// import AdminNav from "./AdminNav";
// import PreLoader from "../PreLoader";

// function ViewProduct() {
//     const [sell, setSell] = useState([]);
//     const [price, setPrice] = useState("");
//     const [stocks,setStocks] = useState("");

//     Axios.get("https://srisaravamoils.onrender.com/postItem", {
//     }).then((res) => {
//         const data = res.data
//         setSell(data);
//     });
//     const handleDelete = async (e, id) => {
//         e.preventDefault()
//         if (window.confirm("Do you want to delete the product") === true) {
//         // alert("Do you want to delete the prod uct");
//         console.log(id);
//         await Axios.delete(`https://srisaravamoils.onrender.com/deleteprod/${id}`);
//         }
//     }
//     const handleUpdate = async (e, id) => {
//         e.preventDefault()
//         if (window.confirm("Do you want update the product") === true ) {
//             console.log(id);
//             console.log(price);
//             console.log(stocks);
//             if(stocks!=="")
//             {
//                 await Axios.put(`https://srisaravamoils.onrender.com/update/${id}`,{stocks:stocks});
//             }
//             else if(price!==""){
//                 await Axios.put(`https://srisaravamoils.onrender.com/update/${id}`,{price:price});
//             }
            
//         }

//     }
    
   


//     const Body = sell.map((val, key) => {

//         return (

//             <div className="allproducts">
//                 <div className="card" key={key} >
//                     <img src={val.image} alt="petp" width="80%" height="130%"></img>
//                     <hr></hr>
//                     <h5 className="product-name"><b>Name :</b> {val.name}</h5>
//                     <h5 className="product-name"><b>Price :</b>Rs. {val.price}</h5>
//                     <h5 className="product-name"><b>Liter :</b> {val.liter}</h5>                    
//                     <h5 className="product-name"><b>Stocks :</b> {val.stocks}</h5>

                    
//                     <form class="form-inline"   >
//                         <div class="form-group">
//                             <input type="text" class="form-control" id="price" placeholder="Enter New Price" style={{marginTop:"5px",marginBottom:"5px"}} onChange={(e) => { setPrice(e.target.value) }} required/>
//                             <input type="text" class="form-control" id="stock" placeholder="Enter New Stock" onChange={(e) => { setStocks(e.target.value) }} required/>
//                         </div>
//                     </form>
//                     <div className="update-delete-button">
//                         <button className="product-add-buttons" onClick={(e) => handleUpdate(e, val._id)}>Update</button>
//                         <button className="product-add-buttonss" onClick={(e) => handleDelete(e, val._id)}>Delete</button>
//                     </div>
                    
                    
//                 </div>
//                 <div>

//                 </div>
//             </div>

//         )
//     })



//     return (
//         <>
//             <AdminNav />
//             <PreLoader />
//             <h4 className="Products"><i class="fa-solid fa-droplet"></i>&nbsp; Products</h4>
//             <div className="flexing">{Body}</div>
//             <div className="backimg2">
//                 <div className="compdetails text-center">
//                     <img src={logo1} alt="compname" className="comname"></img>
//                     <div className="row text-center">
//                         <div className="col-md-4">
//                             <h5 className="bottom"> Any Doubts ? :</h5>
//                             <h6 className="doubt"><i class="fa-solid fa-phone"></i>&nbsp;9788718180</h6>
//                         </div>
//                         <div className="col-md-4">
//                             <h5 className="bottom">Address :</h5>
//                             <h6 className="address"><i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp;Sri Vaari Electrical Building,<br></br> Karur main road,<br></br> Kalipalayam Post,<br></br>Dharapuram, Tiruppur District,<br></br> Tamil nadu - 638661.</h6>
//                         </div>
//                         <div className="col-md-4">
//                             <h5 className="bottom">Email :</h5>
//                             <h6 className="email"><i class="fa-solid fa-envelope"></i>&nbsp;&nbsp;srisarvamoils@gmail.com</h6>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <ScrollToTop />
//         </>

//     )
// }

// export default ViewProduct;
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../../css/viewproduct.css";
import logo1 from "../../assets/logo1b.png";
import ScrollToTop from "../top.js";
import AdminNav from "./AdminNav";
import PreLoader from "../PreLoader";

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    Axios.get("https://srisarvamoils-backend.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Do you want to delete the product?")) {
      try {
        await Axios.delete(`https://srisarvamoils-backend.onrender.com/api/products/delete/${id}`);
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditableFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const updates = editableFields[id];

    if (!updates || (!updates.price && !updates.stock && !updates.liter)) {
      alert("Please enter at least one value to update.");
      return;
    }

    try {
      await Axios.put(`https://srisarvamoils-backend.onrender.com/api/products/update/${id}`, updates);
      alert("Product updated successfully!");

      // Clear updated field
      setEditableFields((prev) => ({ ...prev, [id]: {} }));

      // Refresh local state with updated product
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? { ...product, ...updates } : product
        )
      );
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <>
      <AdminNav />
      <PreLoader />
      <h4 className="Products">
        <i className="fa-solid fa-droplet"></i>&nbsp; Products
      </h4>

      <div className="flexing">
        {products.map((val, key) => (
          <div className="allproducts" key={key}>
            <div className="card">
              <img src={`https://srisarvamoils-backend.onrender.com${val.imageUrl}`} alt="product" width="80%" height="130%" />
              <hr />
              <h5 className="product-name"><b>Name :</b> {val.name}</h5>
              <h5 className="product-name"><b>Price :</b> Rs. {val.price}</h5>
              <h5 className="product-name"><b>Liter :</b> {val.liter}</h5>
              <h5 className="product-name"><b>Stocks :</b> {val.stock}</h5>

              <form className="form-inline">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Price"
                    onChange={(e) => handleInputChange(val._id, "price", e.target.value)}
                    value={editableFields[val._id]?.price || ""}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Stock"
                    onChange={(e) => handleInputChange(val._id, "stock", e.target.value)}
                    value={editableFields[val._id]?.stock || ""}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Liter"
                    onChange={(e) => handleInputChange(val._id, "liter", e.target.value)}
                    value={editableFields[val._id]?.liter || ""}
                  />
                </div>
              </form>

              <div className="update-delete-button">
                <button
                  className="product-add-buttons"
                  onClick={(e) => handleUpdate(e, val._id)}
                >
                  Update
                </button>
                <button
                  className="product-add-buttonss"
                  onClick={(e) => handleDelete(e, val._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="backimg2">
        <div className="compdetails text-center">
          <img src={logo1} alt="compname" className="comname" />
          <div className="row text-center">
            <div className="col-md-4">
              <h5 className="bottom"> Any Doubts ? :</h5>
              <h6 className="doubt"><i className="fa-solid fa-phone"></i>&nbsp;9788718180</h6>
            </div>
            <div className="col-md-4">
              <h5 className="bottom">Address :</h5>
              <h6 className="address">
                <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;Sri Vaari Electrical Building,<br />
                Karur main road,<br />
                Kalipalayam Post,<br />
                Dharapuram, Tiruppur District,<br />
                Tamil Nadu - 638661.
              </h6>
            </div>
            <div className="col-md-4">
              <h5 className="bottom">Email :</h5>
              <h6 className="email"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;srisarvamoils@gmail.com</h6>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
}

export default ViewProduct;
