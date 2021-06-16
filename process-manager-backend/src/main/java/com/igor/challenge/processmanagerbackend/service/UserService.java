package com.igor.challenge.processmanagerbackend.service;

import java.util.List;
import java.util.Optional;

import com.igor.challenge.processmanagerbackend.domain.User;

public interface UserService {

	User add(User user);

	User update(User user);

	void delete(Integer id);

	List<User> findAll();

	Optional<User> findById(Integer id);

}
