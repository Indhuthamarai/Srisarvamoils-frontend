// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/cart.css";
// import Top from "./top.js";
// import Whatsapp1 from "./whatsapp1";

// const Cart = (props) => {
//   // Handle increment
//   const handleIncrement = (item) => {
//     const updatedCart = props.cartItems.map((cartItem) =>
//       cartItem.id === item.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//     props.setCartItems(updatedCart);
//   };

//   // Handle decrement
//   const handleDecrement = (item) => {
//     const updatedCart = props.cartItems.map((cartItem) =>
//       cartItem.id === item.id && cartItem.quantity > 1
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem
//     );
//     props.setCartItems(updatedCart);
//   };

//   // Calculate total price
//   const totalPrice = props.cartItems.reduce(
//     (price, item) => price + item.quantity * item.price,
//     0
//   );

//   // Format price with commas for thousands
//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };
  
//   // Handle WhatsApp order
//   const handleWhatsAppOrder = () => {
//     if (props.cartItems.length === 0) {
//       alert("Please add items to cart before ordering");
//       return;
//     }
    
//     // Create message with order details
//     let message = "Hello! I would like to place an order for:\n\n";
    
//     props.cartItems.forEach(item => {
//       message += `${item.quantity}x ${item.name} (${item.liter}) - Rs. ${formatPrice(item.quantity * item.price)}\n`;
//     });
    
//     message += `\nTotal: Rs. ${formatPrice(totalPrice)}`;
    
//     // Encode the message for URL
//     const encodedMessage = encodeURIComponent(message);
    
//     // Replace with your WhatsApp number or group link
//     const whatsappLink = `https://wa.me/916379407411?text=${encodedMessage}`;
    
//     // Open WhatsApp in new tab
//     window.open(whatsappLink, '_blank');
//   };

//   return (
//     <div className="cart-container">
//       <h4 className="cart-title">
//         My Cart <i className="fas fa-shopping-cart" />
//       </h4>
      
//       <div className="cart-items">
//         <div className="clear-cart">
//           {props.cartItems.length >= 1 && (
//             <button className="clear-cart-button" onClick={props.handleCartClearance}>
//               Clear Cart
//             </button>
//           )}
//         </div>
        
//         {props.cartItems.length === 0 ? (
//           <div className="cart-items-empty">Your cart is empty. Add some products!</div>
//         ) : (
//           <div>
//             {props.cartItems.map((item) => (
//               <div key={item.id} className="cart-items-list">
//                 <img className="cart-items-image" src={item.image} alt={item.name} />
                
//                 <div className="cart-items-name">{item.name} - {item.liter}</div>
                
//                 <div className="cart-items-function">
//                   <button 
//                     className="cart-items-remove" 
//                     onClick={() => handleDecrement(item)}
//                   >
//                     -
//                   </button>
                  
//                   <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  
//                   <button 
//                     className="cart-items-add" 
//                     onClick={() => handleIncrement(item)}
//                   >
//                     +
//                   </button>
                  
//                   <button 
//                     className="cart-items-remove" 
//                     onClick={() => props.handleRemoveProduct(item)}
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <div className="cart-items-price">
//                   {item.quantity} × Rs. {formatPrice(item.price)} = Rs. {formatPrice(item.quantity * item.price)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
        
//         <div className="cart-items-total-price-name">
//           Total price
//           <div className="cart-items-total-price">&nbsp; Rs. {formatPrice(totalPrice)}</div>
//         </div>
//       </div>

//       {/* Action buttons */}
//       <div className="cart-actions">
//         <div className="cart-button-container">
//           <Link to="/buyform" state={{ total: totalPrice, cartItems: props.cartItems }}>
//             <button className="btn btn-primary bt" disabled={props.cartItems.length === 0}>
//               Buy Online
//             </button>
//           </Link>
//         </div>
        
//         <div className="cart-button-container">
//           <button 
//             className="btn btn-success bt whatsapp-btn" 
//             onClick={handleWhatsAppOrder}
//             disabled={props.cartItems.length === 0}
//           >
//             <i className="fab fa-whatsapp"></i> Order via WhatsApp
//           </button>
//         </div>
//       </div>

//       {/* <Whatsapp /> */}
//       <Top />
//     </div>
//   );
// };

// export default Cart;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/cart.css";
// import Top from "./top.js";
// import Whatsapp from "./Whatsapp";

// const Cart = ({ cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance, handlePrice }) => {
//   // Calculate total price
//   const totalPrice = cartItems.reduce(
//     (price, item) => price + item.quantity * item.price,
//     0
//   );

//   // Update price in parent component
//   React.useEffect(() => {
//     handlePrice(totalPrice);
//   }, [totalPrice, handlePrice]);

  // // Handle WhatsApp order
  // const handleWhatsAppOrder = () => {
  //   if (cartItems.length === 0) {
  //     alert("Please add items to cart before ordering");
  //     return;
  //   }
    
  //   // Create message with order details
  //   let message = "Hello! I would like to place an order for:\n\n";
    
  //   cartItems.forEach(item => {
  //     message += `${item.quantity}x ${item.name} - ${item.liter || ''} - Rs. ${item.quantity * item.price}\n`;
  //   });
    
  //   message += `\nTotal: Rs. ${totalPrice}`;
    
  //   // Encode the message for URL
  //   const encodedMessage = encodeURIComponent(message);
    
  //   // Replace with your WhatsApp number
  //   const whatsappLink = `https://wa.me/916379407411?text=${encodedMessage}`;
    
  //   // Open WhatsApp in new tab
  //   window.open(whatsappLink, '_blank');
  // };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">
//         My Cart <i className="fas fa-shopping-cart" />
//       </h2>
      
//       <div className="cart-items">
//         {cartItems.length === 0 ? (
//           <div className="cart-items-empty">Your cart is empty</div>
//         ) : (
//           <>
//             <div className="cart-header">
//               <button className="clear-cart-button" onClick={handleCartClearance}>
//                 Clear Cart
//               </button>
//             </div>
            
//             <div className="cart-items-list-container">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="cart-item">
//                   <div className="cart-item-left">
//                     <img className="cart-item-image" src={item.image} alt={item.name} />
//                     <div className="cart-item-details">
//                       <span className="cart-item-name">{item.name} - {item.liter || ''}</span>
//                     </div>
//                   </div>
                  
//                   <div className="cart-item-right">
//                     <div className="cart-item-quantity">
//                       <button 
//                         className="quantity-btn minus-btn"
//                         onClick={() => handleRemoveProduct(item)}
//                       >
//                         -
//                       </button>
                      
//                       <span className="quantity-value">{item.quantity}</span>
                      
//                       <button 
//                         className="quantity-btn plus-btn"
//                         onClick={() => handleAddProduct(item)}
//                       >
//                         +
//                       </button>
                      
//                       <button 
//                         className="remove-btn"
//                         onClick={() => {
//                           // Complete removal of item
//                           const productToRemove = {...item};
//                           while (productToRemove.quantity > 0) {
//                             handleRemoveProduct(productToRemove);
//                             productToRemove.quantity -= 1;
//                           }
//                         }}
//                       >
//                         Remove
//                       </button>
//                     </div>
                    
//                     <div className="cart-item-price">
//                       {item.quantity} × Rs. {item.price} = Rs. {item.quantity * item.price}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="cart-total">
//               <div className="total-label">Total price</div>
//               <div className="total-amount">Rs. {totalPrice}</div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Action buttons */}
//       <div className="cart-actions">
//         <Link to="/buyform" state={{ total: totalPrice, cartItems: cartItems }} className="cart-action-btn buy-btn">
//           Buy Online
//         </Link>
        
//         <button 
//           className="cart-action-btn whatsapp-btn"
//           onClick={handleWhatsAppOrder}
//           disabled={cartItems.length === 0}
//         >
//           <i className="fab fa-whatsapp"></i> Order via WhatsApp
//         </button>
//       </div>

//       {/* <Whatsapp />
//       <Top /> */}
//     </div>
//   );
// };

// export default Cart;


import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";
import { useAuth } from '../contexts/authContext';

const Cart = ({ cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance, handlePrice }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );

  React.useEffect(() => {
    handlePrice(totalPrice);
  }, [totalPrice, handlePrice]);

  const addProduct = (item) => {
    const silentAdd = true;
    handleAddProduct(item, silentAdd);
  };

  const removeProduct = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, decrementOnly: true };
      handleRemoveProduct(updatedItem);
    } else {
      handleRemoveProduct(item);
    }
  };

  const removeItemCompletely = (item) => {
    handleRemoveProduct(item);
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert("Please add items to cart before ordering");
      return;
    }
  
    // Construct message
    let message = "Hello! I would like to place an order for:\n\n";
  
    cartItems.forEach(item => {
      message += `${item.quantity}x ${item.name} - ${item.liter || ''} - Rs. ${item.quantity * item.price}\n`;
    });
  
    message += `\nTotal: Rs. ${totalPrice}`;
  
    // Encode the message
    const encodedMessage = encodeURIComponent(message);
  
    // Format for wa.me (DO NOT add '+' before country code)
    const phone = "916379407411";
    const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;
  
    // Open WhatsApp
    window.open(whatsappLink, "_blank");
  };
  

  const handleBuyOnline = () => {
    if (loading) {
      alert("Checking authentication... please wait.");
      return;
    }
  
    if (!isAuthenticated) {
      alert("Please login to continue with your purchase");
      navigate("/login");
      return;
    }
  
    // Navigate with total and cartItems
    navigate("/buyform", {
      state: {
        total: totalPrice,
        cartItems: cartItems
      }
    });
  };
  

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        My Cart <i className="fas fa-shopping-cart" />
      </h2>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="cart-items-empty">Your cart is empty</div>
        ) : (
          <>
            <div className="cart-header">
              <button className="clear-cart-button" onClick={handleCartClearance}>
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list-container">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-left">
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.name} - {item.liter || ''}</span>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <div className="cart-item-quantity">
                      <button className="quantity-btn minus-btn" onClick={() => removeProduct(item)}>-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn plus-btn" onClick={() => addProduct(item)}>+</button>
                      <button className="remove-btn" onClick={() => removeItemCompletely(item)}>Remove</button>
                    </div>
                    <div className="cart-item-price">
                      {item.quantity} × Rs. {item.price} = Rs. {item.quantity * item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <div className="total-label">Total price</div>
              <div className="total-amount">Rs. {totalPrice}</div>
            </div>
          </>
        )}
      </div>

      <div className="cart-actions">
        <button
          className="cart-action-btn buy-btn"
          onClick={handleBuyOnline}
          disabled={cartItems.length === 0 || loading}
        >
          {loading ? "Checking login..." : "Buy Online"}
        </button>

        <button
          className="cart-action-btn whatsapp-btn"
          onClick={handleWhatsAppOrder}
          disabled={cartItems.length === 0}
        >
          <i className="fab fa-whatsapp"></i> Order via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Cart;
