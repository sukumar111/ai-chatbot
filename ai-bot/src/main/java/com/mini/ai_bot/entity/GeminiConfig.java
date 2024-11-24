package com.mini.ai_bot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "gemini_flash")
public class GeminiConfig {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "api_Key")
    private String apiKey;

    @Column(name = "api_Url")
    private String apiUrl;


}
