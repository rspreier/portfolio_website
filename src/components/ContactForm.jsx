'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiUrl } from '@/lib/api';

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});
	
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		try {
			const response = await fetch(apiUrl('/api/contact'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			
			const data = await response.json().catch(() => ({}));
			
			if (!response.ok) {
				throw new Error(data.message || data.error || 'Failed to send message');
			}
			
			setSubmitStatus({
				success: true,
				message: data.message || 'Your message has been sent successfully!'
			});
			
			// Reset form
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: ''
			});
			
			// Reset status after 5 seconds
			setTimeout(() => {
				setSubmitStatus(null);
			}, 5000);
		} catch (error) {
			setSubmitStatus({
				success: false,
				message: `There was an error sending your message: ${error.message}`
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	
	return (
		<div className="bg-dark/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-primary-700/30 shadow-lg">
			<h2 className="text-2xl font-bold text-primary-300 mb-6">Send Me a Message</h2>
			
			{submitStatus && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className={`p-4 mb-6 rounded-lg ${
						submitStatus.success ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'
					}`}
				>
					{submitStatus.message}
				</motion.div>
			)}
			
			<form onSubmit={handleSubmit} className="space-y-5">
				{/* Form fields remain the same */}
				<div>
					<label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 bg-dark/70 border border-primary-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-200"
					/>
				</div>
				
				<div>
					<label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 bg-dark/70 border border-primary-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-200"
					/>
				</div>
				
				<div>
					<label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
					<input
						type="text"
						id="subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 bg-dark/70 border border-primary-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-200"
					/>
				</div>
				
				<div>
					<label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						required
						rows="5"
						className="w-full px-4 py-2 bg-dark/70 border border-primary-700/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-200 resize-none"
					></textarea>
				</div>
				
				<button
					type="submit"
					disabled={isSubmitting}
					className="btn btn-primary w-full"
				>
					{isSubmitting ? (
						<>
							<span className="loading loading-spinner loading-sm"></span>
							Sending...
						</>
					) : 'Send Message'}
				</button>
			</form>
		</div>
	);
}
