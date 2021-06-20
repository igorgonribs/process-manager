package com.igor.challenge.processmanagerbackend.exception;

public class CpfViolationException  extends Exception{

	private static final long serialVersionUID = 1L;
	
	public CpfViolationException(String msg) {
		super(msg);
	}
}