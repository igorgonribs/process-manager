package com.igor.challenge.processmanagerbackend.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.challenge.processmanagerbackend.dto.ProcessDto;
import com.igor.challenge.processmanagerbackend.dto.ReportDto;
import com.igor.challenge.processmanagerbackend.service.ProcessService;
import com.igor.challenge.processmanagerbackend.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService service;
	
	@Autowired
	private ProcessService processService;

	@GetMapping("/mine/{user_id}")
	public ResponseEntity<List<ProcessDto>> myProcesses(@PathVariable(value = "user_id") Integer userId) throws Exception {
		List<ProcessDto> list = processService.userProcesses(userId);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<?> addProcess(@RequestBody ReportDto dto) throws Exception {
		service.add(dto);
		return ResponseEntity.noContent().build();
	}
}
