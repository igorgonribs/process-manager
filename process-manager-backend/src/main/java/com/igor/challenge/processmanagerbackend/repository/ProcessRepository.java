package com.igor.challenge.processmanagerbackend.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.domain.User;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Integer> {

	List<Process> findAllByUsersIn(Set<User> users);
}
