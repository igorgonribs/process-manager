package com.igor.challenge.processmanagerbackend.enums;

import lombok.Getter;

@Getter
public enum ProcessStatus {

	OPENED(1, "Opened"),
	RUNNING(2, "Running"),
	WAITING_REPORT(3, "Waiting Report"),
	REPORTED(4, "Reported"),
	DONE(5, "Done"),
	CANCELED(6, "Canceled");
	
	private Integer id;
	private String description;
	
	private ProcessStatus(Integer id, String description) {
		this.id = id;
		this.description = description;
	}
	
}
