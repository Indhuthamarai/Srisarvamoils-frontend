// import React, { useState } from "react";
// import AdminNav from "./AdminNav";
// import Axios from "axios";
// import "../../css/order.css";
// export default function Order() {
//     const [order, setOrder] = useState([]);
//     const [status, setStatus] = useState("");

//     Axios.get("https://srisaravamoils.onrender.com/getOrder", {

//     }).then((res) => {

//         const data = res.data
//         setOrder(data);
//         console.log(data);


//     });
//     const handleUpdate = async (e, id) => {
//         e.preventDefault()
//         if (window.confirm("Do you want update the product") === true) {
//             console.log(id);
//             console.log(status);
//             await Axios.put(`https://srisaravamoils.onrender.com/updatestatus/${id}`, { status: status });
//         }

//     }
//     const handleDelete = async (e, id) => {
//         e.preventDefault()
//         if (window.confirm("Do you want to delete the product") === true) {
//             // alert("Do you want to delete the prod uct");
//             console.log(id);
//             await Axios.delete(`https://srisaravamoils.onrender.com/deletestat/${id}`);
//         }
//     }
//     const Body = order.map((val, key) => {
//         return <>
//             <div className="allproducts1">
//                 <div className="card5" key={key} >
//                     <h5 className="product-name"><b>Name :</b> {val.name}</h5>
//                     <h5 className="product-name"><b>Email :</b> {val.email}</h5>
//                     <h5 className="product-name"><b>Contact Number :</b> {val.contactno}</h5>
//                     <h5 className="product-name"><b>Address :</b> {val.address}</h5>
//                     <h5 className="product-name"><b>City :</b> {val.city}</h5>
//                     <h5 className="product-name"><b>Pincode :</b> {val.pincode}</h5>
//                     <h5 className="product-name"><b>Status :</b> {val.status}</h5>
//                     <h5 className="product-name"><b>Items:</b> 
//                     <div className="items">{val.item.map((val1, key1) => {
//                         return <h6><div className="items1" key={key1}>
//                             <div>{val1.name} - {val1.liter} - {val1.quantity}</div>
//                         </div></h6>
//                     })}
//                     </div>
                    
//                     </h5>
                    
//                     <form class="form-inline"   >
//                         <div class="form-group">
//                             <input type="text" class="form-control" id="price" placeholder="Update Status" onChange={(e) => { setStatus(e.target.value) }} />
//                         </div>
//                     </form>
//                     <div>
//                         <button className="product-add-buttons" onClick={(e) => handleUpdate(e, val._id)}>Update</button>
//                         <button className="product-add-buttonss" onClick={(e) => handleDelete(e, val._id)}>Delete</button>
//                     </div>
//                 </div>



//                 <div>
//                 </div>
//             </div>
//         </>

//     })



//     return (
//         <>
//             <AdminNav />
//             <h4 className="Products"> Orders</h4>
//             <div className="flexing1">{Body}</div>




//         </>

//     )
// }
import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import Axios from "axios";
import "../../css/order.css";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});

  // Fetch all orders from local backend on component mount
  useEffect(() => {
    Axios.get("https://srisarvamoils-backend.onrender.com/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  // Handle status input changes individually
  const handleStatusChange = (id, value) => {
    setStatusUpdate((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Update order status
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Do you want to update the order status?")) {
      try {
        await Axios.put(`https://srisarvamoils-backend.onrender.com/api/orders/${id}`, {
          status: statusUpdate[id] || "",
        });
        alert("Status updated successfully");
        window.location.reload(); // or refetch orders
      } catch (err) {
        console.error("Error updating status:", err);
        alert("Failed to update status");
      }
    }
  };

  // Delete an order
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Do you want to delete this order?")) {
      try {
        await Axios.delete(`https://srisarvamoils-backend.onrender.com/api/orders/${id}`);
        alert("Order deleted successfully");
        window.location.reload(); // or refetch orders
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete order");
      }
    }
  };

  return (
    <>
      <AdminNav />
      <h4 className="Products">All Orders</h4>
      <div className="flexing1">
        {orders.map((order, key) => (
          <div className="allproducts1" key={key}>
            <div className="card5">
              <h5 className="product-name"><b>Name:</b> {order.name}</h5>
              {/* <h5 className="product-name"><b>Email:</b> {order.email}</h5> */}
              <h5 className="product-name"><b>Contact:</b> {order.contactno}</h5>
              <h5 className="product-name"><b>Address:</b> {order.address}, {order.city} - {order.pincode}</h5>
              <h5 className="product-name"><b>Status:</b> {order.status}</h5>
              <h5 className="product-name"><b>Items:</b>
                <div className="items">
                  {order.items.map((item, idx) => (
                    <div className="items1" key={idx}>
                      {item.name} - {item.liter} - Qty: {item.quantity}
                    </div>
                  ))}
                </div>
              </h5>

              <input
                type="text"
                className="form-control"
                placeholder="Update Status"
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              />
              <div style={{ marginTop: "10px" }}>
                <button className="product-add-buttons" onClick={(e) => handleUpdate(e, order._id)}>Update</button>
                <button className="product-add-buttonss" onClick={(e) => handleDelete(e, order._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
