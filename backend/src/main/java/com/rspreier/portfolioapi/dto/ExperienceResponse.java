package com.rspreier.portfolioapi.dto;

import com.rspreier.portfolioapi.model.Experience;

public record ExperienceResponse(
	Long id,
	String position,
	String company,
	String period,
	String description
) {
	public static ExperienceResponse from(Experience experience) {
		return new ExperienceResponse(
			experience.getId(),
			experience.getPosition(),
			experience.getCompany(),
			experience.getPeriod(),
			experience.getDescription()
		);
	}
}
