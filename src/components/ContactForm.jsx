import {React, useState}  from 'react'

export default function ContactForm () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
            
        try {
            const response = await fetch("/api/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            
            const responseData = await response.json();
            alert(responseData.message);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email');
        }
    }

    return (
        <div className="flex flex-wrap justify-center mt-8">
            <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6" onSubmit={handleSubmit}>
                <div className="mb-3 w-full">
                    <label className="block font-medium mb-[2px] text-purple-100" htmlFor="exampleInput90">
                        Name
                    </label>
                    <input type="text" className="px-2 py-2 border w-full outline-none rounded-md" id="exampleInput90" placeholder="Name"
                        onChange={(e) => setName(e.target.value)} />
                </div>
        
                <div className="mb-3 w-full">
                    <label className="block font-medium mb-[2px] text-purple-100" htmlFor="exampleInputEmail1">
                        Email
                    </label>
                    <input type="email" className="px-2 py-2 border w-full outline-none rounded-md" id="exampleInputEmail1"
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
        
                <div className="mb-3 w-full">
                    <label className="block font-medium mb-[2px] text-purple-100" htmlFor="exampleInputSubject">
                        Subject
                    </label>
                    <input type="text" className="px-2 py-2 border w-full outline-none rounded-md" id="exampleInputSubject"
                        placeholder="Enter the subject of message"
                        onChange={(e) => setSubject(e.target.value)} />
                </div>
        
                <div className="mb-3 w-full">
                    <label className="block font-medium mb-[2px] text-purple-100" htmlFor="exampleInputMessage">
                        Message
                    </label>
                    <textarea className="px-2 py-2 border rounded-[5px] w-full outline-none" id="exampleInputMessage"
                        onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
        
                <button type="submit"
                    className="mb-6 inline-block w-full rounded bg-purple-100 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-purple-200">
                    Send
                </button>
            </form>
        </div>
    )
}