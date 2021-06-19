package com.igor.challenge.processmanagerbackend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.challenge.processmanagerbackend.dto.ReportDto;
import com.igor.challenge.processmanagerbackend.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService service;

	@PostMapping
	public ResponseEntity<?> addProcess(@RequestBody ReportDto dto) throws Exception {
		service.add(dto);
		return ResponseEntity.noContent().build();
	}
}
