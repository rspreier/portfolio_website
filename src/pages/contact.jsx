import {React, useState}  from 'react'
import ReactDOM from 'react-dom/client'

import Layout from '@/app/Layout'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
    const [showPopup, setShowPopup] = useState(false);

    const handlePhoneClick = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <Layout>
            <div className="flex flex-col">
                <h1 className="text-center font-bold text-4xl mt-32">Get In Touch</h1>
                <p className="text-center mt-4">Fill out the form below to get in contact with me through email or use the social links below</p>
                <ContactForm />
                {/* Center the image under the form */}
                <div className="flex flex-wrap justify-center text-center fill-purple-100 mt-4 mb-8">
                    <a href="https://www.linkedin.com/in/ryan-spreier/" target="_blank">
                        <img src="/img/linkedin_logo.png" alt="LinkedIn" className="mr-8" style={{ width: '55px', height: '55px' }} />
                    </a>
                    <a href="https://github.com/rspreier" target="_blank">
                        <img src="/img/github_logo.png" alt="Github" style={{ width: '55px', height: '55px' }} />
                    </a>
                    <button onClick={handlePhoneClick}>
                        <img src="/img/phone_logo.png" alt="Phone Number" className="ml-8" style={{ width: '55px', height: '55px' }} />
                    </button>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <button className="text-gray-500 hover:text-gray-700 float-right text-xl font-bold" onClick={closePopup}>
                                &times;
                            </button>
                            <p className="mt-4 text-lg">Phone Number: <a href="tel:+5417061814" className="text-blue-500 hover:underline">(541) 706-1814</a></p>
                            <p className="mt-4 text-lg">Email: <a href="mailto:rspreier@gmail.com" className="text-blue-500 hover:underline">rspreier@gmail.com</a></p>
                        </div>
                    </div>
                )}
            </div>
    </Layout>
  )
}