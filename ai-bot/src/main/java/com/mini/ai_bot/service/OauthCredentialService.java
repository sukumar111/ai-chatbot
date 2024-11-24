package com.mini.ai_bot.service;

import com.mini.ai_bot.entity.OauthCredential;
import com.mini.ai_bot.repository.OauthCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OauthCredentialService {

    @Autowired
    private OauthCredentialRepository repository;

    public OauthCredential getClientId() {
        return repository.findById(1L).orElseThrow(() -> new RuntimeException("Client ID not found"));
    }
}
