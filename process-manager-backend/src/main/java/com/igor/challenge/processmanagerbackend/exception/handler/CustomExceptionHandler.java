package com.igor.challenge.processmanagerbackend.exception.handler;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.igor.challenge.processmanagerbackend.exception.DataIntegrityException;
import com.igor.challenge.processmanagerbackend.exception.InvalidStatusException;

@ControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler
	public ResponseEntity<String> handlerGenericException(Exception ex) {
		return ResponseEntity.internalServerError().body(ex.getMessage());
	}

	@ExceptionHandler(value = InvalidStatusException.class)
	public ResponseEntity<String> handlerInvalidStatusException(InvalidStatusException ex) {
		return ResponseEntity.badRequest().body(ex.getMessage());
	}

	@ExceptionHandler(value = NoSuchElementException.class)
	public ResponseEntity<?> handlerInvalidStatusException(NoSuchElementException ex) {
		return ResponseEntity.notFound().build();
	}

	@ExceptionHandler(DataIntegrityException.class)
	public ResponseEntity<?> dataIntegrityException(DataIntegrityException e) {

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}

}
