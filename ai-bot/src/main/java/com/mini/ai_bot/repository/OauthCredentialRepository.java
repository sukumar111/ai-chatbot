package com.mini.ai_bot.repository;

import com.mini.ai_bot.entity.OauthCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OauthCredentialRepository extends JpaRepository<OauthCredential, Long> {
}
