package com.igor.challenge.processmanagerbackend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.repository.ProcessRepository;
import com.igor.challenge.processmanagerbackend.service.ProcessService;

@Service
public class ProcessServiceimpl implements ProcessService {

	@Autowired
	private ProcessRepository processRepository;

	@Override
	public List<Process> findAll() {
		return processRepository.findAll();
	}

	@Override
	public Optional<Process> findById(Integer id) {
		return processRepository.findById(id);
	}

	@Override
	public Process add(Process process) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Process update(Process process) {
		// TODO Auto-generated method stub
		return null;
	}

}
