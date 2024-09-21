import React from 'react'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const AdoptionForm = () => {

const form = useRef();
const [click, setClick] = useState(false);
const [send, setSend] = useState("sending...");
  const sendEmail = (e) => {
    
    e.preventDefault();
    /* setClick(true);
    emailjs.sendForm('service_goiwxcs', 'template_gd5nxz9', form.current, 'qiY1RTrYfs0SEpD74')
      .then((result) => {
          setSend("Message sent succesfully!");
    
        }, (error) => {
        
          setSend("Couldn't send message, try again later.");
      }); */
  };
  return (
    
    <div name = "contact" className='w-full h-auto bg-gradient-to-b from-black to-gray-800 text-white'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            
            {/* pb-8 and mb-8 same? paddin, margin botto. */}
            {/* make this div so the underline/ bottom border paddin same size as tex. */}
            <div className='mb-8'>
                {/* border-b-3 is border bottom 3px v. */}
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'>
                    Contact
                </p>

                <p className='py-5'>
               Submit the form below to get in touch with me:
                
            </p>
            </div>

            <div className='flex justify-center items-center'>
                <form ref={form} onSubmit={sendEmail} className='flex flex-col w-full md:w-1/2'>
                    <label htmlFor="">
                        Name: 
                    </label>
                    <input type="text" id = "from_name" name = "from_name" placeholder='Enter your name' className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'/>
                    
                    <label htmlFor="" className=''>
                        Email:
                    </label>

                    <input type="email" name = "from_email" id = "from_email" placeholder='Enter your email' className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none'/>

                    <label htmlFor="message">
                        Message:
                    </label>

                    <textarea name="message" id="message" cols="30" rows="10" className='my-3 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none' placeholder='Enter your message'></textarea>

                    <button type ="submit" value="Submit" className='text-white bg-gradient-to-b from-cyan-500 to blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'>
                        {click?
                        send : "Send me a message"}
                    </button>
                </form>
            </div>
            

        </div>
    </div>
  )
}

export default AdoptionForm