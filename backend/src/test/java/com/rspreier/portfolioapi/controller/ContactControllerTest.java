package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.config.ContactRateLimitFilter;
import com.rspreier.portfolioapi.dto.ContactRequest;
import com.rspreier.portfolioapi.dto.ContactSubmissionResult;
import com.rspreier.portfolioapi.exception.EmailDeliveryRequiredException;
import com.rspreier.portfolioapi.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ContactController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(ApiExceptionHandler.class)
class ContactControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private ContactService contactService;

	@MockBean
	private ContactRateLimitFilter contactRateLimitFilter;

	@Test
	void submitReturnsSuccessWhenEmailSent() throws Exception {
		given(contactService.submit(any(ContactRequest.class))).willReturn(new ContactSubmissionResult(true));

		ContactRequest payload = new ContactRequest("Ryan", "ryan@example.com", "Hello", "Message body");

		mockMvc.perform(post("/api/contact")
				.contentType(APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(payload)))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.message").value("Message sent successfully."));
	}

	@Test
	void submitReturnsGatewayWhenDeliveryRequiredAndFails() throws Exception {
		given(contactService.submit(any(ContactRequest.class))).willThrow(new EmailDeliveryRequiredException());

		ContactRequest payload = new ContactRequest("Ryan", "ryan@example.com", "Hello", "Message body");

		mockMvc.perform(post("/api/contact")
				.contentType(APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(payload)))
			.andExpect(status().isBadGateway())
			.andExpect(jsonPath("$.message").value("Message was saved, but email delivery failed."));
	}

	@Test
	void submitReturnsBadRequestOnInvalidPayload() throws Exception {
		String payload = """
			{
			  "name": "",
			  "email": "bad-email",
			  "subject": "",
			  "message": ""
			}
			""";

		mockMvc.perform(post("/api/contact")
				.contentType(APPLICATION_JSON)
				.content(payload))
			.andExpect(status().isBadRequest());
	}
}
