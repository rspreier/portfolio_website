package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.dto.ExperienceResponse;
import com.rspreier.portfolioapi.dto.ProjectResponse;
import com.rspreier.portfolioapi.service.ContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContentController {
	private final ContentService contentService;

	public ContentController(ContentService contentService) {
		this.contentService = contentService;
	}

	@GetMapping("/projects")
	public List<ProjectResponse> getProjects(
		@RequestParam(required = false) String category
	) {
		return contentService.getProjects(category);
	}

	@GetMapping("/experiences")
	public List<ExperienceResponse> getExperiences() {
		return contentService.getExperiences();
	}
}
