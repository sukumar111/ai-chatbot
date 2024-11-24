package com.mini.ai_bot.repository;

import com.mini.ai_bot.entity.GeminiConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeminiConfigRepository extends JpaRepository<GeminiConfig, Long> {
    // You can define custom queries if needed
//    LinkedInOAuthSettings findByServiceName(String serviceName);
}
