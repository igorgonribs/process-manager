package com.igor.challenge.processmanagerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.igor.challenge.processmanagerbackend.domain.Process;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Integer> {

}
