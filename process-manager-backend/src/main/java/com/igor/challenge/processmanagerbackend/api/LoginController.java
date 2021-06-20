package com.igor.challenge.processmanagerbackend.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.service.UserService;

@RestController
@RequestMapping("/login")
public class LoginController extends ParentController {

	@Autowired
	private UserService service;

	@GetMapping(value = "{cpf}")
	public ResponseEntity<User> findById(@PathVariable(value = "cpf") String cpf) {
		return ResponseEntity.ok().body(service.findByCpf(cpf));
	}
}
