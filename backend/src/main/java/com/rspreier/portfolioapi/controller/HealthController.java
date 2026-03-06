package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.dto.ApiMessageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {
	@GetMapping
	public ApiMessageResponse health() {
		return new ApiMessageResponse("ok");
	}
}
