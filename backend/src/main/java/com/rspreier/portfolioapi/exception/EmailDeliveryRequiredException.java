package com.rspreier.portfolioapi.exception;

public class EmailDeliveryRequiredException extends RuntimeException {
	public EmailDeliveryRequiredException() {
		super("Message was saved, but email delivery failed.");
	}
}
