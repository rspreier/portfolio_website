package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.dto.ApiMessageResponse;
import com.rspreier.portfolioapi.exception.EmailDeliveryRequiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiMessageResponse> handleValidation(MethodArgumentNotValidException ex) {
		String message = ex.getBindingResult().getFieldErrors().stream()
			.findFirst()
			.map(err -> err.getField() + ": " + err.getDefaultMessage())
			.orElse("Invalid request payload.");
		return ResponseEntity.badRequest().body(new ApiMessageResponse(message));
	}

	@ExceptionHandler(MailException.class)
	public ResponseEntity<ApiMessageResponse> handleMail(MailException ex) {
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
			.body(new ApiMessageResponse("Unable to send email right now. Please try again later."));
	}

	@ExceptionHandler(EmailDeliveryRequiredException.class)
	public ResponseEntity<ApiMessageResponse> handleDeliveryRequired(EmailDeliveryRequiredException ex) {
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
			.body(new ApiMessageResponse("Message was saved, but email delivery failed."));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiMessageResponse> handleGeneric(Exception ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(new ApiMessageResponse("An unexpected error occurred."));
	}
}
