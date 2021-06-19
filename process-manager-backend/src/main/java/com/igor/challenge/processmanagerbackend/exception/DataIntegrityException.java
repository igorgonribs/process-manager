package com.igor.challenge.processmanagerbackend.exception;

public class DataIntegrityException extends Exception{

	private static final long serialVersionUID = 1L;
	
	public DataIntegrityException(String mensagem) {
		super(mensagem);
	}
}
