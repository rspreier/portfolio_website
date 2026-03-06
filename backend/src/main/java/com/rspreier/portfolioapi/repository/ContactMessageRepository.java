package com.rspreier.portfolioapi.repository;

import com.rspreier.portfolioapi.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
