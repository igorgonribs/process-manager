package com.igor.challenge.processmanagerbackend.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.dto.ProcessDto;
import com.igor.challenge.processmanagerbackend.enums.ProcessStatus;
import com.igor.challenge.processmanagerbackend.repository.ProcessRepository;
import com.igor.challenge.processmanagerbackend.service.ProcessService;

@Service
public class ProcessServiceimpl implements ProcessService {

	@Autowired
	private ProcessRepository processRepository;

	@Override
	public List<ProcessDto> findAll() throws Exception {
		List<Process> processes = processRepository.findAll();
		List<ProcessDto> dtos = new ArrayList<ProcessDto>();
		for (Process process : processes) {
			ProcessDto dto = new ProcessDto();
			convertDomainClassToDto(dto, process);
			dtos.add(dto);
		}
		return dtos;
	}

	@Override
	public ProcessDto findById(Integer id) throws Exception {
		Optional<Process> process = processRepository.findById(id);

		ProcessDto dto = new ProcessDto();
		convertDomainClassToDto(dto, process.get());
		return dto;
	}

	@Override
	public ProcessDto add(ProcessDto dto) throws Exception {
		dto.setStatus(ProcessStatus.CREATED.getDescription());
		Process process = new Process();
		convertDtoToDomainClass(dto, process);
		process = processRepository.save(process);
		convertDomainClassToDto(dto, process);
		return dto;
	}

	@Override
	public ProcessDto update(ProcessDto dto) throws Exception {
		Optional<Process> process = processRepository.findById(dto.getId());

		convertDtoToDomainClass(dto, process.get());
		Process processUpdated = processRepository.save(process.get());
		convertDomainClassToDto(dto, processUpdated);
		return dto;
	}

	private void convertDtoToDomainClass(ProcessDto dto, Process process) throws Exception {

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		process.setStatus(ProcessStatus.getIdByDescription(dto.getStatus()));
		process.setCreatedBy(dto.getCreatedBy());
		process.setDescription(dto.getDescription());
		process.setExpectedReportDate(sdf.parse(dto.getExpectedReportDate()));
		process.setId(dto.getId());
		process.setName(dto.getName());
		process.setReports(dto.getReports());
		process.setUsers(dto.getUsers());
	}

	private void convertDomainClassToDto(ProcessDto dto, Process process) throws Exception {

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		dto.setStatus(ProcessStatus.getDescriptionById(process.getStatus()));
		dto.setCreatedBy(process.getCreatedBy());
		dto.setDescription(process.getDescription());
		dto.setExpectedReportDate(sdf.format(process.getExpectedReportDate()));
		dto.setId(process.getId());
		dto.setName(process.getName());
		dto.setReports(process.getReports());
		dto.setUsers(process.getUsers());
	}
}