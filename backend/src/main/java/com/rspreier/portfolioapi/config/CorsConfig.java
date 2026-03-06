package com.rspreier.portfolioapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
	@Value("${app.cors.allowed-origins:http://localhost:3000}")
	private String allowedOrigins;

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		List<String> origins = Arrays.stream(allowedOrigins.split(","))
			.map(String::trim)
			.toList();

		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
					.allowedOrigins(origins.toArray(String[]::new))
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowedHeaders("*");
			}
		};
	}
}
