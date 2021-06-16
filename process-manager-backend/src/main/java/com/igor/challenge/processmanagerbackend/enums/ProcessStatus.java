package com.igor.challenge.processmanagerbackend.enums;

import lombok.Getter;

@Getter
public enum ProcessStatus {

	CREATED(1, "Created"),
	RUNNING(2, "Running"),
	WAITING_REPORT(3, "Waiting Report"),
	SUCCESS(4, "Success"),
	FAILED(5, "Failed"),
	CANCELED(6, "Canceled");
	
	private Integer id;
	private String description;
	
	private ProcessStatus(Integer id, String description) {
		this.id = id;
		this.description = description;
	}
	
}
