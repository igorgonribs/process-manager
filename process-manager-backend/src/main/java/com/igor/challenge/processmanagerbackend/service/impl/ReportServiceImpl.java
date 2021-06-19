package com.igor.challenge.processmanagerbackend.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.challenge.processmanagerbackend.domain.Report;
import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.dto.ReportDto;
import com.igor.challenge.processmanagerbackend.repository.ReportRepository;
import com.igor.challenge.processmanagerbackend.service.ReportService;
import com.igor.challenge.processmanagerbackend.domain.Process; 

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	private ReportRepository repository;

	@Override
	public void add(ReportDto dto) {
		repository.save(convertDtoToDomainClass(dto));
	}

	private Report convertDtoToDomainClass(ReportDto dto) {
		Report report = new Report();
		
		User user = new User();
		user.setId(dto.getWriterId());
		
		Process process = new Process();
		process.setId(dto.getProcessId());
		
		report.setDescription(dto.getDescription());
		report.setWriter(user);
		report.setProcess(process);
		report.setReportDate(new Date());
		return report;
	}

}
