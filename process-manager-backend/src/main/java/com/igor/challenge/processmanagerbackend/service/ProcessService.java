package com.igor.challenge.processmanagerbackend.service;

import java.util.List;
import java.util.Optional;

import com.igor.challenge.processmanagerbackend.domain.Process;

public interface ProcessService {
	List<Process> findAll();

	Optional<Process> findById(Integer id);

	Process add(Process process);

	Process update(Process process);

}
