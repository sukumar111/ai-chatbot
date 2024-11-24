package com.mini.ai_bot.controller;

import com.mini.ai_bot.entity.GeminiConfig;
import com.mini.ai_bot.entity.User;
import com.mini.ai_bot.model.ChatRequest;
import com.mini.ai_bot.repository.UserRepository;
import com.mini.ai_bot.service.GeminiConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatbotController {

    @Autowired
    private GeminiConfigService configService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ChatRequest chatRequest) {
        RestTemplate restTemplate = new RestTemplate();

        // Retrieve the apiKey and apiUrl from the database
        final GeminiConfig geminiConfig = configService.getGeminiConfig();
        String apiKey = geminiConfig.getApiKey();
        String apiUrl = geminiConfig.getApiUrl();


        // Prepare request body for external API
        String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" + chatRequest.getPrompt() + "\"}]}]}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Call the external API
        ResponseEntity<String> response = restTemplate.exchange(
                apiUrl + "?key=" + apiKey,
                HttpMethod.POST,
                entity,
                String.class

        );

        // Return the response from external API to the frontend
        return ResponseEntity.ok(response.getBody());
    }

    @Retryable(
            value = {HttpServerErrorException.ServiceUnavailable.class},
            maxAttempts = 5,
            backoff = @Backoff(delay = 2000, multiplier = 2)
    )

    private ResponseEntity<String> makeApiRequest(RestTemplate restTemplate, String apiKey, String apiUrl, HttpEntity<String> entity) {
        try {
            return restTemplate.exchange(
            apiUrl + "?key=" + apiKey,
            HttpMethod.POST,
                entity,
            String.class

        );
        } catch (HttpServerErrorException.ServiceUnavailable ex) {
            // Log the error
            System.err.println("Service unavailable: " + ex.getResponseBodyAsString());
            throw ex;
        }

    }

    @GetMapping("/name")
    public ResponseEntity<String> getUserName(@RequestParam String email) {
        User userName = userRepository.findByEmail(email);
        String fullName = userName.getFullName();
        if (fullName != null) {
            System.out.println(" Pass fullName :" + fullName);
            return ResponseEntity.ok(fullName);
        } else {
            System.out.println(" FAil fullName :" + null);
            return ResponseEntity.notFound().build();
        }
    }
}
