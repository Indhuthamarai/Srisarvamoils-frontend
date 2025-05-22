import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/BuyForm.css";

export default function BuyForm() {
  const [name, setUName] = useState("");
  const [contactno, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderId, setOrderId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { total, cartItems, handleCartClearance } = location.state || { total: 0, cartItems: [], handleCartClearance: null };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order.");
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (err) {
        console.error("Token decode failed:", err);
        navigate("/login");
      }
    }
  }, [navigate]);

  const createOrder = async () => {
    try {
      setIsSubmitting(true);
      // Create the order in your database first
      console.log("Submitting order data:", {
        name,
        email,
        contactno,
        address,
        city,
        pincode,
        status: "pending",
        totalAmount: total,
        paymentmethod,
        items: cartItems,
      });
      
      const response = await Axios.post("https://srisarvamoils-backend.onrender.com/api/orders", {
        name,
        email,
        contactno,
        address,
        city,
        pincode,
        status: "pending",
        totalAmount: total,
        paymentmethod,
        items: cartItems,
      });
      
     
      const createdOrderId = response.data.orderId || response.data._id || `order-${Math.floor(Math.random() * 9000000000) + 1000000000}`;
      setOrderId(createdOrderId);
      setIsSubmitting(false);
      return createdOrderId;
    } catch (error) {
      setIsSubmitting(false);
      console.error("Order submission error:", error);
      alert("Failed to submit order: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const validateForm = () => {
    if (!name || !contactno || !address || !city || !pincode) {
      alert("Please fill all required fields");
      return false;
    }
    
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return false;
    }
    
    return true;
  };

  const proceedToPayment = (e) => {
    e.preventDefault(); // Prevent any default form submission
    
    if (!validateForm()) return;
    
    // Store shipping details in sessionStorage for the payment page
    sessionStorage.setItem('shippingAddress', address);
    sessionStorage.setItem('shippingCity', city);
    sessionStorage.setItem('shippingPincode', pincode);
    
    // Navigate to payment page with necessary details
    console.log("Navigating to payment page with total:", total);
    navigate("/payment", { 
      state: { 
        amount: total,
        name,
        email,
        contactno,
        cartItems,
        handleCartClearance
      } 
    });
  };

  const handleCODConfirmation = async () => {
    if (isSubmitting) return;
    
    setShowConfirmation(false);
    const createdOrderId = await createOrder();
    
    if (createdOrderId) {
      if (handleCartClearance) handleCartClearance();
      
      // Generate order data for the order confirmation page
      const orderData = {
        orderId: createdOrderId,
        email: email || "kokila@gmail.com", // Use default if email is undefined
        createdAt: new Date().toISOString(),
        status: "Pending",
        totalAmount: total,
        items: cartItems
      };
      
      // Navigate to the OrderConfirmation page with the order data
      navigate("/order-confirmation", { 
        state: { 
          orderId: createdOrderId,
          orderData: orderData
        } 
      });
    }
  };

  const showCODConfirmation = (e) => {
    e.preventDefault(); // Prevent any default form submission
    
    if (!validateForm()) return;
    
    setPaymentMethod("Cash on Delivery");
    setShowConfirmation(true);
  };

  return (
    <div className="container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-grid">
        <div className="customer-details">
          <h3>Shipping Details</h3>
          <form className="details-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                value={name}
                onChange={(e) => setUName(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Contact No:</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                value={contactno}
                onChange={(e) => setContact(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea 
                className="form-control" 
                rows="2" 
                required 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={city}
                  onChange={(e) => setCity(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Pincode:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)} 
                />
              </div>
            </div>
            <input type="hidden" value={email} />
          </form>
        </div>

        <div className="order-summaryy">
          <h3>Order Summary</h3>
          <div className="cart-items-summary">
            {cartItems && cartItems.length > 0 ? (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">x{item.quantity}</div>
                    <div className="item-price">Rs. {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          
          <div className="price-details">
            <div className="price-row">
              <span>Subtotal</span>
              <span>Rs. {total}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
          
          <div className="payment-options">
            <button 
              className="payment-btn razorpay-btn" 
              onClick={proceedToPayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Pay Online (Razorpay)"}
            </button>
            <button 
              className="payment-btn cod-btn" 
              onClick={showCODConfirmation}
              disabled={isSubmitting}
            >
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for COD */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Order</h3>
            <p>Do you want to place this order with Cash on Delivery?</p>
            <p className="total-text">Total Amount: Rs. {total}</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowConfirmation(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleCODConfirmation} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}