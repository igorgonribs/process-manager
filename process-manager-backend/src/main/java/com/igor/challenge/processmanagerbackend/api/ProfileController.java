package com.igor.challenge.processmanagerbackend.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.igor.challenge.processmanagerbackend.domain.Profile;
import com.igor.challenge.processmanagerbackend.service.ProfileService;

@RestController
@RequestMapping("/profile")
public class ProfileController {

	@Autowired
	private ProfileService service;

	@GetMapping
	public ResponseEntity<List<Profile>> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}
}
