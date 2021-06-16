package com.igor.challenge.processmanagerbackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.igor.challenge.processmanagerbackend.domain.Profile;
import com.igor.challenge.processmanagerbackend.repository.ProfileRepository;
import com.igor.challenge.processmanagerbackend.service.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private ProfileRepository repository;

	@Override
	public List<Profile> findAll() {
		return repository.findAll();
	}

}
