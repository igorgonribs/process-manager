package com.igor.challenge.processmanagerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.igor.challenge.processmanagerbackend.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
