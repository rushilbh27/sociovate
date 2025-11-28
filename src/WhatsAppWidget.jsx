import React from 'react';
import './WhatsAppWidget.css';

export default function WhatsAppWidget({ phone = '+919860483065', message = "Hi! I'm interested in Sociovate's automations." }) {
  const cleaned = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  // Force the wa.me link to use the provided number (user's number)
  const waNumber ='919860483065';
  const href = `https://wa.me/${waNumber}?text=${encoded}`;

  return (
    <div className="whatsapp-widget__wrap" aria-hidden="false">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-widget"
        title="Chat with us on WhatsApp"
      >
        {/* Use a PNG/PNGx WhatsApp logo placed at /public/assets/whatsapp.png */}
        <img src="public/washuppp.svg" alt="WhatsApp" className="whatsapp-icon" />
        <span className="whatsapp-label">Chat with us!</span>
      </a>
    </div>
  );
}
