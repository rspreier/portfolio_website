package com.rspreier.portfolioapi.service;

import com.rspreier.portfolioapi.dto.ExperienceResponse;
import com.rspreier.portfolioapi.dto.ProjectResponse;
import com.rspreier.portfolioapi.repository.ExperienceRepository;
import com.rspreier.portfolioapi.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
	private final ProjectRepository projectRepository;
	private final ExperienceRepository experienceRepository;

	public ContentService(ProjectRepository projectRepository, ExperienceRepository experienceRepository) {
		this.projectRepository = projectRepository;
		this.experienceRepository = experienceRepository;
	}

	public List<ProjectResponse> getProjects(String category) {
		if (category == null || category.isBlank() || category.equalsIgnoreCase("all")) {
			return projectRepository.findAllByOrderBySortOrderAsc().stream()
				.map(ProjectResponse::from)
				.toList();
		}

		return projectRepository.findByCategoryOrderBySortOrderAsc(category.toLowerCase()).stream()
			.map(ProjectResponse::from)
			.toList();
	}

	public List<ExperienceResponse> getExperiences() {
		return experienceRepository.findAllByOrderBySortOrderAsc().stream()
			.map(ExperienceResponse::from)
			.toList();
	}
}
