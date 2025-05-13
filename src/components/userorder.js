import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../css/userOrder.css";

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // If no token, alert user and return early
    if (!token) {
      alert("Please login to view your orders.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      const userEmail = decoded.email;
      console.log("User Email:", userEmail);

      setEmail(userEmail);
      fetchUserOrders(userEmail);
    } catch (error) {
      console.error("Token decode failed:", error);
    }
  }, []);

  const fetchUserOrders = async (email) => {
    try {
      const res = await axios.post("http://localhost:5000/api/orders/user", {
        email,
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="order-container">
      <h2 className="orders-title">My Orders</h2>
      
      {/* Order List */}
      <div className="order-list">
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">
                <div className="order-id">
                  <span className="label">Order ID:</span> {order._id}
                </div>
                <div className="order-date">
                  <span className="label">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="order-summary">
                <div className="order-status">
                  <span className="status-badge">{order.status}</span>
                </div>
                <div className="order-total">
                  <span className="label">Total:</span> ₹{order.totalAmount}
                </div>
              </div>
              <div className="order-actions">
                <button
                  className="view-details-btn"
                  onClick={() => viewOrderDetails(order)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-btn" onClick={closeOrderDetails}>×</button>
            </div>
            <div className="modal-body">
              <div className="customer-info">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.name}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Contact:</strong> {selectedOrder.contactno}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                <p><strong>City:</strong> {selectedOrder.city}</p>
                <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
              </div>
              <div className="order-info">
                <h4>Order Information</h4>
                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentmethod}</p>
              </div>
              <div className="order-items">
                <h4>Ordered Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.liter}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="order-summary-detail">
                <h4>Order Summary</h4>
                <div className="summary-item">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping:</span>
                  <span>₹0.00</span>
                </div>
                <div className="summary-item total">
                  <span>Total:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserOrder;