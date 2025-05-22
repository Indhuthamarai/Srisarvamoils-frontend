// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Axios from "axios";
// import "../css/orderconfirm.css";

// export default function OrderConfirmation() {
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         // Get the orderId from the location state passed during navigation
//         const orderId = location.state?.orderId;
        
//         if (!orderId) {
//           console.error("No order ID provided");
//           setLoading(false);
//           return;
//         }
        
//         // Fetch order details from the API
//         const response = await Axios.get(`https://srisarvamoils-backend.onrender.com/api/orders/${orderId}`);
//         setOrderDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         setLoading(false);
//       }
//     };
    
//     fetchOrderDetails();
//   }, [location.state]);
  
//   const handleContinueShopping = () => {
//     navigate("/"); // Navigate to home page or product listing
//   };
  
//   const handleViewOrders = () => {
//     navigate("/orders"); // Navigate to orders page
//   };
  
//   // Format date to display in the desired format
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
//   };
  
//   if (loading) {
//     return <div className="loading">Loading order details...</div>;
//   }
  
//   if (!orderDetails) {
//     return (
//       <div className="error-container">
//         <h2>Order Not Found</h2>
//         <p>We couldn't find your order details. Please try again later.</p>
//         <button onClick={handleContinueShopping} className="action-button">
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }
  
//   // Generate a random order number if needed
//   const orderNumber = orderDetails.orderId || 
//     `order-${Math.floor(Math.random() * 1000000000000)}`;
  
//   return (
//     <div className="order-confirmation-container">
//       <div className="confirmation-card">
//         <div className="check-icon">
//           <svg viewBox="0 0 24 24" width="48" height="48">
//             <circle cx="12" cy="12" r="12" fill="#e7f7e8"/>
//             <path 
//               d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
//               fill="#4CAF50"
//             />
//           </svg>
//         </div>
        
//         <h1 className="confirmation-title">Order Confirmed!</h1>
        
//         <p className="confirmation-message">
//           Thank you for your purchase. We've sent a confirmation
//           email to {orderDetails.email}.
//         </p>
        
//         <div className="order-number">
//           <p>Order Number: {orderNumber}</p>
//         </div>
        
//         <div className="order-info-container">
//           <div className="order-info-card">
//             <div className="order-info-icon">
//               <svg viewBox="0 0 24 24" width="24" height="24">
//                 <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#F9A826"/>
//               </svg>
//             </div>
//             <div className="order-info-details">
//               <h3>Order Date</h3>
//               <p>{formatDate(orderDetails.createdAt || new Date())}</p>
//             </div>
//           </div>
          
//           <div className="order-info-card">
//             <div className="order-info-icon">
//               <svg viewBox="0 0 24 24" width="24" height="24">
//                 <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="#F9A826"/>
//               </svg>
//             </div>
//             <div className="order-info-details">
//               <h3>Order Status</h3>
//               <p>{orderDetails.status || "Pending"}</p>
//             </div>
//           </div>
          
//           <div className="order-info-card">
//             <div className="order-info-icon">
//               <svg viewBox="0 0 24 24" width="24" height="24">
//                 <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#F9A826"/>
//               </svg>
//             </div>
//             <div className="order-info-details">
//               <h3>Total Amount</h3>
//               <p>${orderDetails.totalAmount?.toFixed(2) || "19.99"}</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="order-details-section">
//           <h2>Order Details</h2>
          
//           <div className="order-items">
//             {orderDetails.items && orderDetails.items.map((item, index) => (
//               <div className="order-item" key={index}>
//                 <div className="item-details">
//                   <h3>{item.name}</h3>
//                   <p>Quantity: {item.quantity} × ${item.price}</p>
//                 </div>
//                 <div className="item-price">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </div>
//               </div>
//             ))}
            
//             {(!orderDetails.items || orderDetails.items.length === 0) && (
//               <div className="order-item">
//                 <div className="item-details">
//                   <h3>Lavender Fields</h3>
//                   <p>Quantity: 1 × $19.99</p>
//                 </div>
//                 <div className="item-price">
//                   $19.99
//                 </div>
//               </div>
//             )}
//           </div>
          
//           <div className="order-summary">
//             <div className="summary-item">
//               <span>Subtotal</span>
//               <span>${orderDetails.totalAmount?.toFixed(2) || "19.99"}</span>
//             </div>
//             <div className="summary-item">
//               <span>Shipping</span>
//               <span>$0.00</span>
//             </div>
//             <div className="summary-item total">
//               <span>Total</span>
//               <span>${orderDetails.totalAmount?.toFixed(2) || "19.99"}</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="action-buttons">
//           <button 
//             className="continue-shopping" 
//             onClick={handleContinueShopping}
//           >
//             Continue Shopping
//           </button>
//           <button 
//             className="view-orders" 
//             onClick={handleViewOrders}
//           >
//             View Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";                    //working but ui not nice and ordernumber instead of id
import Axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "../css/orderconfirm.css";

export default function OrderConfirmation() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user email from token
    const getUserFromToken = () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          // Check if email exists in decoded token, else use the id
          return decoded.email || decoded.id;
        }
        return null;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };
    
    const initializeOrderDetails = async () => {
      // Get user email from token
      const userIdentifier = getUserFromToken();
      setUserEmail(userIdentifier);
      
      // First check if orderData was passed directly in state
      if (location.state?.orderData) {
        // Make sure the orderData has the email if it's available
        const orderData = {
          ...location.state.orderData,
          email: location.state.orderData.email || userIdentifier || "customer@example.com"
        };
        setOrderDetails(orderData);
        setLoading(false);
        return;
      }
      
      // If not, try to fetch from API
      try {
        // Get the orderId from the location state passed during navigation
        const orderId = location.state?.orderId;
        
        if (!orderId) {
          console.error("No order ID provided");
          setLoading(false);
          return;
        }
        
        // Fetch order details from the API
        const response = await Axios.get(`https://srisarvamoils-backend.onrender.com/api/orders/${orderId}`);
        
        // If response.data is the order object directly
        if (response.data && (response.data.orderId || response.data._id)) {
          setOrderDetails({
            ...response.data,
            orderId: response.data.orderId || response.data._id,
            email: response.data.email || userIdentifier || "customer@example.com"
          });
        } 
        // If response.data has the order in a nested property
        else if (response.data.order) {
          setOrderDetails({
            ...response.data.order,
            orderId: response.data.order.orderId || response.data.order._id,
            email: response.data.order.email || userIdentifier || "customer@example.com"
          });
        }
        // If response data has some other structure
        else {
          console.error("Unexpected API response structure:", response.data);
          throw new Error("Unexpected API response structure");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        // If API fails, create a fallback order object with the orderId
        if (location.state?.orderId) {
          setOrderDetails({
            orderId: location.state.orderId,
            email: userIdentifier || "customer@example.com",
            createdAt: new Date().toISOString(),
            status: "Pending",
            totalAmount: location.state?.total || 19.99,
            items: location.state?.items || [{ name: "Lavender Fields", quantity: 1, price: 19.99 }]
          });
        }
        setLoading(false);
      }
    };
    
    initializeOrderDetails();
  }, [location.state]);
  
  const handleContinueShopping = () => {
    navigate("/"); // Navigate to home page or product listing
  };
  
  const handleViewOrders = () => {
    navigate("/userorder"); // Navigate to orders page
  };
  
  // Format date to display in the desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }
  
  if (!orderDetails) {
    return (
      <div className="error-container">
        <h2>Order Not Found</h2>
        <p>We couldn't find your order details. Please try again later.</p>
        <button onClick={handleContinueShopping} className="action-button">
          Continue Shopping
        </button>
      </div>
    );
  }
  
  // Generate a random order number if needed
  const orderNumber = orderDetails.orderId || 
    `order-${Math.floor(Math.random() * 1000000000000)}`;
  
  return (
    <div className="order-confirmation-container">
      <div className="confirmation-card">
        <div className="check-icon">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <circle cx="12" cy="12" r="12" fill="#e7f7e8"/>
            <path 
              d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" 
              fill="#4CAF50"
            />
          </svg>
        </div>
        
        <h1 className="confirmation-title">Order Confirmed!</h1>
        
        <p className="confirmation-message">
          Thank you for your purchase. We've sent a confirmation
          email to {orderDetails.email}.
        </p>
        
        <div className="order-number">
          <p>Order Number: {orderNumber}</p>
        </div>
        
        <div className="order-info-container">
          <div className="order-info-card">
            <div className="order-info-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" fill="#F9A826"/>
              </svg>
            </div>
            <div className="order-info-details">
              <h3>Order Date</h3>
              <p>{formatDate(orderDetails.createdAt || new Date())}</p>
            </div>
          </div>
          
          <div className="order-info-card">
            <div className="order-info-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" fill="#F9A826"/>
              </svg>
            </div>
            <div className="order-info-details">
              <h3>Order Status</h3>
              <p>{orderDetails.status || "Pending"}</p>
            </div>
          </div>
          
          <div className="order-info-card">
            <div className="order-info-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#F9A826"/>
              </svg>
            </div>
            <div className="order-info-details">
              <h3>Total Amount</h3>
              <p>₹{orderDetails.totalAmount?.toFixed(2) || "19.99"}</p>
            </div>
          </div>
        </div>
        
        <div className="order-details-section">
          <h2>Order Details</h2>
          
          <div className="order-items">
            {orderDetails.items && orderDetails.items.length > 0 ? (
              orderDetails.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="order-item">
                <div className="item-details">
                  <h3>Lavender Fields</h3>
                  <p>Quantity: 1 × ₹19.99</p>
                </div>
                <div className="item-price">
                  ₹19.99
                </div>
              </div>
            )}
          </div>
          
          <div className="order-summary">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{orderDetails.totalAmount?.toFixed(2) || "19.99"}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>₹{orderDetails.totalAmount?.toFixed(2) || "19.99"}</span>
            </div>
          </div>
        </div>
        
        <div className="action-buttons">
          <button 
            className="continue-shopping" 
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button 
            className="view-orders" 
            onClick={handleViewOrders}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

