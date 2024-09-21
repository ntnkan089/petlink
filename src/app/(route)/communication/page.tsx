'use client'

import { useState } from 'react';

export default function ContactForm() {


    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    // Log the form data for now (you can send it somewhere later)
    console.log('Form Data:', formData);

    // Clear form after submission
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(true);

    // Reset the success message after a few seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
        {isSubmitted && <p style={{ color: 'green' }}>Message sent successfully!</p>}
      </form>
    </div>
  );
}
