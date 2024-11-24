package com.mini.ai_bot.repository;

import com.mini.ai_bot.entity.LinkedInOAuthSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkedInOAuthSettingsRepository extends JpaRepository<LinkedInOAuthSettings, Long> {
    LinkedInOAuthSettings findByServiceName(String serviceName);
}
