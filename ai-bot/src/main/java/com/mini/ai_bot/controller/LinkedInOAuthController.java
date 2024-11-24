package com.mini.ai_bot.controller;

import com.mini.ai_bot.entity.LinkedInOAuthSettings;
import com.mini.ai_bot.service.LinkedInOAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauth")
public class LinkedInOAuthController {

    @Autowired
    private LinkedInOAuthService linkedInOAuthService;

    @GetMapping("/linkedin")
    public String getLinkedInOAuthUrl() {
        LinkedInOAuthSettings settings = linkedInOAuthService.getLinkedInOAuthSettings();
        return "https://www.linkedin.com/oauth/v2/authorization?response_type=code"
            + "&client_id=" + settings.getClientId()
            + "&redirect_uri=" + settings.getRedirectUri()
            + "&state=" + settings.getState()
            + "&scope=" + settings.getScope();
    }
}
