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
