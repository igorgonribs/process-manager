package com.igor.challenge.processmanagerbackend.api;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.dto.ProcessDto;
import com.igor.challenge.processmanagerbackend.service.ProcessService;

@RestController
@RequestMapping(value = "/process")
public class ProcessController extends ParentController {

	@Autowired
	private ProcessService service;

	@GetMapping
	public ResponseEntity<List<ProcessDto>> findAll() throws Exception {
		List<ProcessDto> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "{id}")
	public ResponseEntity<ProcessDto> findById(@PathVariable(value = "id") Integer id) throws Exception {
		return ResponseEntity.ok().body(service.findById(id));
	}

	@PostMapping
	public ResponseEntity<ProcessDto> addProcess(@RequestBody ProcessDto dto) throws Exception {
		ProcessDto process = service.add(dto);
		URI createdProcessUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(process.getId()).toUri();
		return ResponseEntity.created(createdProcessUri).body(process);
	}

	@PutMapping
	public ResponseEntity<Process> updateProcess(@RequestBody ProcessDto process) throws Exception {
		service.update(process);
		return ResponseEntity.noContent().build();
	}

}
