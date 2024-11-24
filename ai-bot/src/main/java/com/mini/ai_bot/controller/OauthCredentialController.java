package com.mini.ai_bot.controller;

import com.mini.ai_bot.entity.OauthCredential;
import com.mini.ai_bot.service.OauthCredentialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OauthCredentialController {

    @Autowired
    private OauthCredentialService service;

    @GetMapping("/api/client-id")
    public OauthCredential getClientId() {
        return service.getClientId();
    }
}
