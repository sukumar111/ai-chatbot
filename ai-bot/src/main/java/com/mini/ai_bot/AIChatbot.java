package com.mini.ai_bot;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class AIChatbot {

  private static final String API_KEY = "AIzaSyDgCyfDcrmhtt0DGJ-IgxWzpdvuHxFB3xg";
  private static final String URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  public static String getAIResponse(String prompt) {
    RestTemplate restTemplate = new RestTemplate();
    String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" + prompt + "\"}]}]}";
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
    ResponseEntity<String> response = restTemplate.exchange(URL + "?key=" + API_KEY, HttpMethod.POST, entity, String.class);

    return response.toString();
  }

  public static void main(String[] args) {


    String prompt = "Explain how AI works";
    String response = getAIResponse(prompt);
    System.out.println("AI Response: " + response);
  }
}