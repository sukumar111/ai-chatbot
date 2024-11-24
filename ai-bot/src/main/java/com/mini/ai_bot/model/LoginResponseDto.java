package com.mini.ai_bot.model;

// LoginResponseDto.java
public class LoginResponseDto {
    private String email;
    private String status;

    public LoginResponseDto(String email, String status) {
        this.email = email;
        this.status = status;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
