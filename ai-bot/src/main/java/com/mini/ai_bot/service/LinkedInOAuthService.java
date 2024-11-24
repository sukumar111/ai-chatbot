package com.mini.ai_bot.service;

import com.mini.ai_bot.entity.LinkedInOAuthSettings;
import com.mini.ai_bot.repository.LinkedInOAuthSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkedInOAuthService {

    @Autowired
    private LinkedInOAuthSettingsRepository repository;

    public LinkedInOAuthSettings getLinkedInOAuthSettings() {
        return repository.findByServiceName("linkedin");
    }
}
