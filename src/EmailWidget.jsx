import React from 'react';
import './EmailWidget.css';

export default function EmailWidget({ email = 'rushil@sociovate.com', subject = 'Inquiry from Sociovate Website' }) {
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  return (
    <div className="email-widget__wrap" aria-hidden="false">
      <a
        href={href}
        className="email-widget"
        title="Send us an email"
      >
        <img src="gmail-icon-free-png.webp" alt="Email" className="email-icon" />
      </a>
    </div>
  );
}