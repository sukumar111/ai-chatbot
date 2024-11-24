package com.mini.ai_bot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
@EntityScan
public class AiBotApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiBotApplication.class, args);
	}


}
