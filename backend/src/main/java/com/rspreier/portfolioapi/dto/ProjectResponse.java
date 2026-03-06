package com.rspreier.portfolioapi.dto;

import com.rspreier.portfolioapi.model.Project;

import java.util.Arrays;
import java.util.List;

public record ProjectResponse(
	Long id,
	String category,
	String title,
	String description,
	List<String> technologies,
	String image,
	String alt
) {
	public static ProjectResponse from(Project project) {
		List<String> technologies = Arrays.stream(project.getTechnologiesCsv().split(","))
			.map(String::trim)
			.filter(s -> !s.isEmpty())
			.toList();

		return new ProjectResponse(
			project.getId(),
			project.getCategory(),
			project.getTitle(),
			project.getDescription(),
			technologies,
			project.getImageUrl(),
			project.getImageAlt()
		);
	}
}
