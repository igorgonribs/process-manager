package com.igor.challenge.processmanagerbackend.service;

import java.util.List;

import com.igor.challenge.processmanagerbackend.dto.ProcessDto;

public interface ProcessService {
	List<ProcessDto> findAll() throws Exception;

	ProcessDto findById(Integer id) throws Exception;

	ProcessDto add(ProcessDto dto) throws Exception;

	ProcessDto update(ProcessDto dto) throws Exception;
	
	List<ProcessDto> userProcesses(Integer userId) throws Exception;

}
