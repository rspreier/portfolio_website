package com.rspreier.portfolioapi.controller;

import com.rspreier.portfolioapi.config.ContactRateLimitFilter;
import com.rspreier.portfolioapi.dto.ExperienceResponse;
import com.rspreier.portfolioapi.dto.ProjectResponse;
import com.rspreier.portfolioapi.service.ContentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ContentController.class)
@AutoConfigureMockMvc(addFilters = false)
class ContentControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private ContentService contentService;

	@MockBean
	private ContactRateLimitFilter contactRateLimitFilter;

	@Test
	void getProjectsReturnsContent() throws Exception {
		given(contentService.getProjects(eq("web"))).willReturn(List.of(
			new ProjectResponse(
				1L,
				"web",
				"Test Project",
				"Description",
				List.of("React"),
				"/img/test.png",
				"test image"
			)
		));

		mockMvc.perform(get("/api/projects").param("category", "web"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].title").value("Test Project"))
			.andExpect(jsonPath("$[0].category").value("web"));
	}

	@Test
	void getExperiencesReturnsContent() throws Exception {
		given(contentService.getExperiences()).willReturn(List.of(
			new ExperienceResponse(1L, "Engineer", "Company", "2024", "Details")
		));

		mockMvc.perform(get("/api/experiences"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0].position").value("Engineer"))
			.andExpect(jsonPath("$[0].company").value("Company"));
	}
}
