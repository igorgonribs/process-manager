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

import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService service;

	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}

	@GetMapping(value = "{id}")
	public ResponseEntity<User> findById(@PathVariable(value = "id") Integer id) {
		return ResponseEntity.ok().body(service.findById(id).get());
	}

	@PostMapping
	public ResponseEntity<User> addUser(@RequestBody User user) throws URISyntaxException {
		user = service.add(user);
		URI createdUserUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId())
				.toUri();
		return ResponseEntity.created(createdUserUri).body(user);
	}

	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody User user) throws URISyntaxException {
		user = service.update(user);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping(value = "{id}")
	public ResponseEntity<User> deleteUser(@PathVariable(value = "id") Integer id) throws URISyntaxException {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
