import "../css/Products.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import logo1 from "../assets/logo1b.png";
import ScrollToTop from "../components/top.js";
import Whatsapp from "./Whatsapp";

function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const Body = products.map((val, key) => (
    <div className="allproducts2" key={key}>
      <div className="card allvalues">
        <img
          src={`http://localhost:5000${val.imageUrl}`}
          alt="product"
          width="80%"
          height="130%"
        />
        <hr />
        <h5 className="product-name"><b>Name :</b> {val.name}</h5>
        <h5 className="product-name"><b>Price :</b> Rs. {val.price}</h5>
        <h5 className="product-name"><b>Liter :</b> {val.liter}</h5>
        <h5 className="product-name"><b>Stocks :</b> {val.stocks}</h5>
        <button className="product-add-button" onClick={() => props.handleAddProduct(val)}>
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <h4 className="Products"><i className="fa-solid fa-droplet"></i>&nbsp; Products</h4>

      <div className="flexing">{Body}</div>

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

      <Whatsapp />
      <ScrollToTop />
    </>
  );
}

export default Products;
