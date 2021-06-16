package com.igor.challenge.processmanagerbackend.repository;

import org.springframework.stereotype.Repository;

import com.igor.challenge.processmanagerbackend.domain.Profile;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {

}
