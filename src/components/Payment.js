


// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Axios from "axios";

// export default function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [orderId, setOrderId] = useState(null);

//   const { amount, name, email, contactno, cartItems, handleCartClearance } = location.state || {};

//   useEffect(() => {
//     if (!amount || !cartItems) {
//       setError("Missing order details. Please return to checkout.");
//       setLoading(false);
//       return;
//     }

//     createOrder();
//   }, []);

//   const createOrder = async () => {
//     try {
//       const response = await Axios.post("http://localhost:5000/api/orders", {
//         name,
//         email,
//         contactno,
//         status: "pending",
//         totalAmount: amount,
//         paymentmethod: "Razorpay",
//         items: cartItems,
//       });

//       const createdOrderId = response.data.orderId || response.data._id;
//       setOrderId(createdOrderId);
//       loadRazorpayScript();
//     } catch (error) {
//       console.error("Order submission error:", error);
//       setError("Failed to create order: " + (error.response?.data?.message || error.message));
//       setLoading(false);
//     }
//   };

//   const loadRazorpayScript = () => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = initializeRazorpay;
//     script.onerror = () => setError("Failed to load Razorpay. Please try again.");
//     document.body.appendChild(script);
//   };

//   const initializeRazorpay = () => {
//     const options = {
//       key: "rzp_test_QeoZBfMPnP1fyI", // Replace with your Razorpay Key ID
//       amount: amount * 100,
//       currency: "INR",
//       name: "Your Store Name",
//       description: `Payment for order #${orderId}`,
//       handler: function (response) {
//         handlePaymentSuccess(response);
//       },
//       prefill: {
//         name: name || "",
//         email: email || "",
//         contact: contactno || "",
//       },
//       notes: {
//         address: "Your Store Address",
//         orderId: orderId,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//       method: {
//         upi: true,      // ✅ Enables UPI (GPay, PhonePe, etc.)
//         card: true,
//         netbanking: true,
//         wallet: true,
//       },
//       modal: {
//         ondismiss: function () {
//           console.log("Payment modal closed");
//           navigate("/payment-canceled", { state: { orderId } });
//           setLoading(false);
//         }
//       }
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     setLoading(false);
//   };

//   const handlePaymentSuccess = async (response) => {
//     try {
//       console.log("Payment successful:", response);

//       try {
//         await Axios.put(`http://localhost:5000/api/orders/${orderId}`, {
//           status: "paid",
//           paymentId: response.razorpay_payment_id || "direct-payment",
//         });
//       } catch (updateErr) {
//         console.warn("Could not update order status, but payment was successful:", updateErr);
//       }

//       if (handleCartClearance) handleCartClearance();

//       navigate("/payment-success", {
//         state: {
//           orderId,
//           paymentId: response.razorpay_payment_id || "direct-payment"
//         }
//       });

//     } catch (error) {
//       console.error("Payment handling error:", error);
//       navigate("/payment-failed", {
//         state: {
//           orderId,
//           error: "Payment handling failed"
//         }
//       });
//     }
//   };

//   if (error) {
//     return (
//       <div className="container mt-5 text-center">
//         <div className="alert alert-danger">
//           <h4>Payment Error</h4>
//           <p>{error}</p>
//           <button className="btn btn-primary mt-3" onClick={() => navigate("/payment")}>
//             Return to Checkout
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5 text-center">
//       {loading ? (
//         <div>
//           <h3>Initializing Payment...</h3>
//           <div className="spinner-border mt-3" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">You will be redirected to Razorpay payment gateway</p>
//           <p className="text-muted">Amount: ₹{amount}</p>
//         </div>
//       ) : (
//         <div>
//           <h3>Redirecting to Payment Gateway...</h3>
//           <button className="btn btn-outline-dark mt-3" onClick={initializeRazorpay}>
//             <img
//               src="https://img.icons8.com/color/48/google-pay-india.png"
//               alt="GPay"
//               style={{ height: "30px", marginRight: "10px" }}
//             />
//             Pay with Google Pay / UPI
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

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
    const res = await fetch("http://localhost:5000/api/orders", {
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



// import React, { useState, useEffect } from "react";                         //amount shows 0
// import { useLocation, useNavigate } from "react-router-dom";
// import Axios from "axios";

// export default function Payment() {
//   const [paymentDone, setPaymentDone] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Destructure everything we passed from BuyForm
//   const {
//     name = "",
//     email = "",
//     contactno = "",
//     address = "",
//     cartItems = [],
//     total = 0,
//   } = location.state || {};

//   // Prefill user details
//   const userDetails = { name, email, contactno, address };

//   // Load Razorpay script
//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   // Called by Razorpay on success
//   const handlePaymentSuccess = async (razorpayResponse) => {
//     try {
//       const paymentId = razorpayResponse.razorpay_payment_id;

//       // Create order in backend
//       const payload = {
//         items: cartItems,
//         totalAmount: total,
//         paymentId,
//         status: "Paid",
//         customer: userDetails,
//       };

//       const response = await Axios.post(
//         "http://localhost:5000/api/orders",
//         payload
//       );

//       const orderId = response.data._id;

//       setPaymentDone(true);

//       // Navigate to confirmation with both IDs
//       navigate("/order-confirmation", {
//         state: { orderId, paymentId, cartItems, total },
//       });
//     } catch (err) {
//       console.error("Order creation failed:", err);
//       alert(
//         "Payment succeeded, but we couldn't create your order. Please contact support."
//       );
//     }
//   };

//   const handlePayment = async () => {
//     const loaded = await loadRazorpayScript();
//     if (!loaded) {
//       alert("Failed to load Razorpay SDK");
//       return;
//     }

//     const amountInPaise = total * 100;
//     const options = {
//       key: "rzp_test_xJn1KfhqB0jUwu",
//       amount: amountInPaise,
//       currency: "INR",
//       name: "SRISARVAM",
//       description: "Order Payment",
//       prefill: {
//         name: userDetails.name,
//         email: userDetails.email,
//         contact: userDetails.contactno,
//       },
//       notes: { address: userDetails.address },
//       theme: { color: "#3399cc" },
//       handler: handlePaymentSuccess,
//       modal: {
//         ondismiss: () => alert("Payment popup closed."),
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="payment-container">
//       <h3>Pay ₹{total} Online</h3>
//       <button
//         className="btn btn-primary"
//         onClick={handlePayment}
//         disabled={paymentDone}
//       >
//         {paymentDone ? "Payment Completed" : "Proceed to Pay"}
//       </button>
//     </div>
//   );
// }
