
import React from "react";
import "../css/whatsapp1.css";

const Whatsapp1 = () => {
  // Replace with your WhatsApp business number
  const whatsappNumber = "+916379407411";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="whatsapp-float" onClick={handleWhatsAppClick}>
      <i className="fab fa-whatsapp whatsapp-icon"></i>
    </div>
  );
};

export default Whatsapp1;