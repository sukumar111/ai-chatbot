package com.mini.ai_bot.service;


import com.mini.ai_bot.entity.User;
import com.mini.ai_bot.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.MessagingException;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) throws MessagingException, jakarta.mail.MessagingException {
        // Check if user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            logger.warn("User with email {} already exists", user.getEmail());
            throw new RuntimeException("User with this email already exists");
        }
        logger.info("Registering user with email: {}", user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.isReceiveUpdates() ){
            sendRegistrationEmail(user.getEmail(),user.getFullName(),"http://localhost:3000/signin");
        }
        return userRepository.save(user);
    }

    public void sendRegistrationEmail(String toEmail, String userName, String signInUrl) throws MessagingException, jakarta.mail.MessagingException {
        // Prepare the email context
        Context context = new Context();
        context.setVariable("userName", userName);
        context.setVariable("signInUrl", signInUrl);

        // Generate the email content using the Thymeleaf template
        String emailContent = templateEngine.process("welcome-email", context);

        // Create the email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setTo(toEmail);
        helper.setSubject("Welcome! Your Registration is Successful!");
        helper.setText(emailContent, true); // true indicates HTML content

        // Send the email
        mailSender.send(message);
    }

    public boolean validateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }


}
