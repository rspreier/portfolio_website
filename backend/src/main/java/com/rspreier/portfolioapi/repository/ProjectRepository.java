package com.rspreier.portfolioapi.repository;

import com.rspreier.portfolioapi.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findAllByOrderBySortOrderAsc();
	List<Project> findByCategoryOrderBySortOrderAsc(String category);
}
