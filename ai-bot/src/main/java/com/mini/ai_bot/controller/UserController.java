package com.mini.ai_bot.controller;


import com.mini.ai_bot.entity.User;
import com.mini.ai_bot.model.LoginResponseDto;
import com.mini.ai_bot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws MessagingException, jakarta.mail.MessagingException {
        logger.info("Received registration request for email: {}", user.getEmail());
        return userService.registerUser(user);
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody User loginUser) {
//        boolean isValidUser = userService.validateUser(loginUser.getEmail(), loginUser.getPassword());
//        if (isValidUser) {
//            logger.info("Login successful {}", loginUser.getEmail());
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(401).body("Invalid email or password");
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody User loginUser) {
        boolean isValidUser = userService.validateUser(loginUser.getEmail(), loginUser.getPassword());

        if (isValidUser) {
            logger.info("Login successful {}", loginUser.getEmail());

            // Return DTO with email and "Login successful" status
            LoginResponseDto responseDto = new LoginResponseDto(loginUser.getEmail(), "Logged in successfully. Redirecting to ai-chat page...");
            return ResponseEntity.ok(responseDto);
        } else {
            // Return DTO with email and "Invalid email or password" status
            LoginResponseDto responseDto = new LoginResponseDto(loginUser.getEmail(), "Invalid email or password");
            return ResponseEntity.status(401).body(responseDto);
        }
    }




}
