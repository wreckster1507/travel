import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or email)
    console.log('Form submitted:', formData);
    // Reset form fields
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Contact Us</h1>
      <p className='mb-6 text-slate-700'>We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.</p>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-slate-700' htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full border border-slate-300 rounded-lg p-2'
            placeholder='Your Name'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-slate-700' htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full border border-slate-300 rounded-lg p-2'
            placeholder='Your Email'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-slate-700' htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            className='w-full border border-slate-300 rounded-lg p-2'
            rows='5'
            placeholder='Your Message'
          />
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition'>
          Send Message
        </button>
      </form>
    </div>
  );
}
