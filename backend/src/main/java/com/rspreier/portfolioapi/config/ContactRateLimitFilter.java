package com.rspreier.portfolioapi.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rspreier.portfolioapi.dto.ApiMessageResponse;
import com.rspreier.portfolioapi.ratelimit.InMemorySlidingWindowRateLimiter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(1)
public class ContactRateLimitFilter extends OncePerRequestFilter {
	private final InMemorySlidingWindowRateLimiter rateLimiter;
	private final ObjectMapper objectMapper;

	@Value("${app.contact.rate-limit.requests-per-minute:8}")
	private int requestsPerMinute;

	public ContactRateLimitFilter(InMemorySlidingWindowRateLimiter rateLimiter, ObjectMapper objectMapper) {
		this.rateLimiter = rateLimiter;
		this.objectMapper = objectMapper;
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		return !("POST".equalsIgnoreCase(request.getMethod()) && "/api/contact".equals(request.getRequestURI()));
	}

	@Override
	protected void doFilterInternal(
		HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain
	) throws ServletException, IOException {
		String key = request.getRemoteAddr();
		boolean allowed = rateLimiter.allow(key, requestsPerMinute, 60_000);

		if (!allowed) {
			response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
			response.setContentType(MediaType.APPLICATION_JSON_VALUE);
			ApiMessageResponse body = new ApiMessageResponse("Too many contact requests. Please wait and try again.");
			response.getWriter().write(objectMapper.writeValueAsString(body));
			return;
		}

		filterChain.doFilter(request, response);
	}
}
