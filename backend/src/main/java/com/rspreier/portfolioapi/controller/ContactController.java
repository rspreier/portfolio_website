package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.dto.ApiMessageResponse;
import com.rspreier.portfolioapi.dto.ContactRequest;
import com.rspreier.portfolioapi.dto.ContactSubmissionResult;
import com.rspreier.portfolioapi.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
	private final ContactService contactService;

	public ContactController(ContactService contactService) {
		this.contactService = contactService;
	}

	@PostMapping
	public ResponseEntity<ApiMessageResponse> submit(@Valid @RequestBody ContactRequest request) {
		ContactSubmissionResult result = contactService.submit(request);
		String message = result.emailSent()
			? "Message sent successfully."
			: "Message saved successfully. Email delivery is currently unavailable.";
		return ResponseEntity.ok(new ApiMessageResponse(message));
	}
}
