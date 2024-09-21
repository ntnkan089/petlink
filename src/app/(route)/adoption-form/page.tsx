'use client'
import React, { useState, useRef } from 'react';
//import emailjs from '@emailjs/browser'

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

const AdoptionForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [click, setClick] = useState<boolean>(false);
  const [send, setSend] = useState<string>("sending...");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const data: FormData = {
        from_name: formData.get('from_name') as string,
        from_email: formData.get('from_email') as string,
        message: formData.get('message') as string,
      };

      // Uncomment the code below when using emailjs
      /*
      setClick(true);
      emailjs.sendForm('service_goiwxcs', 'template_gd5nxz9', form.current, 'qiY1RTrYfs0SEpD74')
        .then((result) => {
            setSend("Message sent successfully!");
        }, (error) => {
            setSend("Couldn't send message, try again later.");
        });
      */
    }
  };

  return (
    <div className=''>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='mb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
            Contact
          </p>
          <p className='py-5'>
            Submit the form below to get in touch with me:
          </p>
        </div>
        <div className='flex justify-center items-center'>
          <form ref={form} onSubmit={sendEmail} className='flex flex-col w-full md:w-1/2'>
            <label htmlFor="from_name">
              Name:
            </label>
            <input type="text" id="from_name" name="from_name" placeholder='Enter your name' className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' required />

            <label htmlFor="from_email">
              Email:
            </label>
            <input type="email" name="from_email" id="from_email" placeholder='Enter your email' className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' required />

            <label htmlFor="message">
              Message:
            </label>
            <textarea name="message" id="message" cols={30} rows={10} className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' placeholder='Enter your message' required></textarea>

            <button type="submit" className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>
              {click ? send : "Send me a message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptionForm;
