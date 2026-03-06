package com.rspreier.portfolioapi.service;

import com.rspreier.portfolioapi.dto.ContactRequest;
import com.rspreier.portfolioapi.dto.ContactSubmissionResult;
import com.rspreier.portfolioapi.exception.EmailDeliveryRequiredException;
import com.rspreier.portfolioapi.model.ContactMessage;
import com.rspreier.portfolioapi.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
	private final ContactMessageRepository contactMessageRepository;
	private final JavaMailSender mailSender;

	@Value("${app.contact.mail.to}")
	private String contactToEmail;

	@Value("${app.contact.mail.from}")
	private String contactFromEmail;

	@Value("${app.contact.mail.enabled:false}")
	private boolean mailEnabled;

	@Value("${app.contact.mail.require-delivery:false}")
	private boolean requireDelivery;

	public ContactService(ContactMessageRepository contactMessageRepository, JavaMailSender mailSender) {
		this.contactMessageRepository = contactMessageRepository;
		this.mailSender = mailSender;
	}

	public ContactSubmissionResult submit(ContactRequest request) {
		ContactMessage message = new ContactMessage();
		message.setName(request.name());
		message.setEmail(request.email());
		message.setSubject(request.subject());
		message.setMessage(request.message());
		contactMessageRepository.save(message);

		if (!mailEnabled) {
			return new ContactSubmissionResult(false);
		}

		SimpleMailMessage email = new SimpleMailMessage();
		email.setFrom(contactFromEmail);
		email.setTo(contactToEmail);
		email.setReplyTo(request.email());
		email.setSubject("[Portfolio Contact] " + request.subject());
		email.setText("""
			New portfolio contact form submission.
			
			Name: %s
			Email: %s
			Subject: %s
			
			Message:
			%s
			""".formatted(request.name(), request.email(), request.subject(), request.message()));

		try {
			mailSender.send(email);
			return new ContactSubmissionResult(true);
		} catch (MailException ignored) {
			if (requireDelivery) {
				throw new EmailDeliveryRequiredException();
			}
			return new ContactSubmissionResult(false);
		}
	}
}
