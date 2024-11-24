package com.mini.ai_bot.service;

import com.mini.ai_bot.entity.GeminiConfig;
import com.mini.ai_bot.repository.GeminiConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeminiConfigService {

    @Autowired
    private GeminiConfigRepository configRepository;

    public GeminiConfig getGeminiConfig() {
        return configRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Configuration not found"));
    }
}
