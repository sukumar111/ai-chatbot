package com.mini.ai_bot.controller;

import com.mini.ai_bot.entity.User;
import com.mini.ai_bot.repository.UserRepository;
import com.mini.ai_bot.service.UserService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PasswordController {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository for DB operations

    @Autowired
    private UserService userService;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender mailSender;

    // Endpoint to verify if email exists
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean exists = userRepository.existsByEmail(email);

        return exists ? ResponseEntity.ok(Map.of("exists", true))
                      : ResponseEntity.ok(Map.of("exists", false));
    }

    // Endpoint to update the password
    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> request) throws MessagingException, jakarta.mail.MessagingException {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Update password logic (hashing recommended)
            user.setPassword(passwordEncoder.encode(newPassword)); // You should hash the password before saving
           if(userOptional.get().isReceiveUpdates()){
               sendForgotEmail(user.getFullName(), user.getEmail());
           }
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("message", "Email not found"));
        }
    }

    private void sendForgotEmail(String fullName, String toEmail) throws jakarta.mail.MessagingException {
        Context context = new Context();
        context.setVariable("userName", fullName);

        // Generate the email content using the Thymeleaf template
        String emailContent = templateEngine.process("ForgetPassword", context);

        // Create the email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setTo(toEmail);
        helper.setSubject("Welcome! Your Password Updated Successful!");
        helper.setText(emailContent, true); // true indicates HTML content

        // Send the email
        mailSender.send(message);
    }


}
