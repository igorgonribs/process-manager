package com.igor.challenge.processmanagerbackend.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.igor.challenge.processmanagerbackend.domain.Profile;
import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.exception.CpfViolationException;
import com.igor.challenge.processmanagerbackend.exception.DataIntegrityException;
import com.igor.challenge.processmanagerbackend.repository.UserRepository;
import com.igor.challenge.processmanagerbackend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repository;

	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	@Override
	public User add(User user) throws CpfViolationException {
		trySaveUser(user);
		return trySaveUser(user);
	}

	private User trySaveUser(User user) throws CpfViolationException {
		User newUser = new User();
		try {
			 newUser = repository.save(user);
		} catch(DataIntegrityViolationException ex) {
			throw new CpfViolationException("CPF já cadastrado"); 
		}
		return newUser;
	}

	@Override
	public User update(User user) throws CpfViolationException {
		trySaveUser(user);
		return trySaveUser(user);
	}

	@Override
	public void delete(Integer id) throws DataIntegrityException {
		User userToDelete = new User();
		userToDelete.setId(id);
		try {
			repository.delete(userToDelete);
		} catch (DataIntegrityViolationException ex) {
			throw new DataIntegrityException(
					"Não foi possível remover o usuário pois este usuário tem processos relacionados a ele.");
		}
	}

	@Override
	public Optional<User> findById(Integer id) {
		return repository.findById(id);
	}

	@Override
	public User findByCpf(String cpf) {
		List<User> list = repository.findByCpf(cpf);

		if (list.size() == 0)
			throw new NoSuchElementException("Usuário inexistente");

		return list.get(0);
	}

	@Override
	public List<User> findOperators() {
		Profile profile = new Profile();
		profile.setId(3);
		return repository.findByProfile(profile);
	}

}
