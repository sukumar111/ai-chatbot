package com.mini.ai_bot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "linkedin_oauth_credentials")
public class LinkedInOAuthSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name")
    private String serviceName;

    @Column(name = "client_id")
    private String clientId;

    @Column(name = "redirect_uri_encoded")
    private String redirectUri;

    @Column(name = "state")
    private String state;

    @Column(name = "scope")
    private String scope;

    @Column(name = "primary_client_secret")
    private String primaryClientSecret;

}
