package com.rspreier.portfolioapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String category;

	@Column(nullable = false)
	private String title;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String description;

	@Column(name = "technologies_csv", nullable = false)
	private String technologiesCsv;

	@Column(name = "image_url", nullable = false)
	private String imageUrl;

	@Column(name = "image_alt", nullable = false)
	private String imageAlt;

	@Column(name = "sort_order", nullable = false)
	private Integer sortOrder;

	public Long getId() {
		return id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTechnologiesCsv() {
		return technologiesCsv;
	}

	public void setTechnologiesCsv(String technologiesCsv) {
		this.technologiesCsv = technologiesCsv;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getImageAlt() {
		return imageAlt;
	}

	public void setImageAlt(String imageAlt) {
		this.imageAlt = imageAlt;
	}

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}
}
