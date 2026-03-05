import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
	try {
		const { name, email, subject, message } = await request.json();
		
		// Validate input
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Configure email transporter
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: process.env.EMAIL_TO,
			replyTo: email,
			subject: `${subject}`,
			text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
			`,
			html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
	<h2>New Contact Form Submission</h2>
	<p><strong>Name:</strong> ${name}</p>
	<p><strong>Email:</strong> ${email}</p>
	<p><strong>Subject:</strong> ${subject}</p>
	<h3>Message:</h3>
	<p>${message.replace(/\n/g, '<br>')}</p>
</div>
			`,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ success: true, message: 'Email sent successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error sending email:', error);
		return NextResponse.json(
			{ error: 'Failed to send email', details: error.message },
			{ status: 500 }
		);
	}
}