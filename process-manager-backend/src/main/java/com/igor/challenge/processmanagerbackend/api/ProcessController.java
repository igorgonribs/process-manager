package com.igor.challenge.processmanagerbackend.api;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.service.ProcessService;

@RestController
@RequestMapping(value = "/process")
public class ProcessController {

	@Autowired
	private ProcessService service;

	@GetMapping
	public ResponseEntity<List<Process>> findAll() {
		List<Process> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "{id}")
	public ResponseEntity<Process> findById(@PathVariable(value = "id") Integer id) {
		return ResponseEntity.ok().body(service.findById(id).get());
	}

	@PostMapping
	public ResponseEntity<Process> addUser(@RequestBody Process process) throws URISyntaxException {
		process = service.add(process);
		URI createdProcessUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(process.getId()).toUri();
		return ResponseEntity.created(createdProcessUri).body(process);
	}

	@PutMapping
	public ResponseEntity<Process> updateProcess(@RequestBody Process process) throws URISyntaxException {
		process = service.update(process);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping()
	public ResponseEntity<Process> deleteProcess(@RequestBody Process process) throws URISyntaxException {
		service.update(process);
		return ResponseEntity.noContent().build();
	}

}
