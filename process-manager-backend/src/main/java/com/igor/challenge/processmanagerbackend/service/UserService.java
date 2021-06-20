package com.igor.challenge.processmanagerbackend.service;

import java.util.List;
import java.util.Optional;

import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.exception.DataIntegrityException;

public interface UserService {

	User add(User newUser);

	User update(User user);

	void delete(Integer id) throws DataIntegrityException ;

	List<User> findAll();

	Optional<User> findById(Integer id);
	
	User findByCpf(String cpf);

}
