import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment({ onPaymentSuccess }) {
  const [showPopup, setShowPopup] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);                    //work correctly
  const location = useLocation();
  const navigate = useNavigate();

  const { name, email, contactno, address = "", cartItems = [] } = location.state || {};
  const userDetails = { name, email, contactno, address };

  useEffect(() => {
    // Show the popup automatically when the component mounts
    setShowPopup(true);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setShowPopup(false); // Close the popup
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const options = {
      key: "rzp_test_xJn1KfhqB0jUwu",
      amount: totalAmount * 100,
      currency: "INR",
      name: "SRISARVAM",
      description: "Order Payment",
      handler: async function (response) {
  alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
  setPaymentDone(true);

  try {
    // Call your backend to create the order
    const res = await fetch("https://srisarvamoils-backend.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        contactno,
        address,
        city: sessionStorage.getItem("shippingCity") || "",
        pincode: sessionStorage.getItem("shippingPincode") || "",
        status: "paid",
        totalAmount: totalAmount,
        paymentmethod: "Online Payment",
        paymentId: response.razorpay_payment_id,
        items: cartItems,
      }),
    });

    const data = await res.json();

    const createdOrderId =
      data.orderId || data._id || `order-${Math.floor(Math.random() * 9000000000) + 1000000000}`;

    // Navigate to order confirmation with orderId and orderData
    navigate("/order-confirmation", {
      state: {
        orderId: createdOrderId,
        orderData: {
          orderId: createdOrderId,
          email,
          createdAt: new Date().toISOString(),
          status: "Paid",
          totalAmount,
          items: cartItems,
        },
      },
    });
  } catch (err) {
    console.error("Order creation failed after payment:", err);
    alert("Order could not be created. Please contact support.");
  }
},

      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contactno,
      },
      notes: {
        address: userDetails.address,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          alert("Payment popup closed.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      {/* Payment Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h4>Proceed with Payment?</h4>
            <p>Click below to pay securely via Razorpay.</p>
            <button className="btn btn-success" onClick={handlePayment}>
              Pay Now
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* If payment already done */}
      {paymentDone && (
        <div className="alert alert-success mt-3">
          Payment completed. Redirecting...
        </div>
      )}
    </div>
  );
}
