package com.mini.ai_bot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Entity
@Getter
@Setter
@Table(name ="users")
public class User {
    
    private static final Logger logger = LoggerFactory.getLogger(User.class);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getFullName() {
        return fullName;
    }

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean receiveUpdates;

    public User() {
        logger.info("User instance created");
    }

    public User(String fullName, String email, String password, boolean receiveUpdates) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.receiveUpdates = receiveUpdates;
        logger.info("User instance created with fullName: {}, email: {}", fullName, email);
    }


}
