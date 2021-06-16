package com.igor.challenge.processmanagerbackend.enums;

import lombok.Getter;

@Getter
public enum ReportStatus {

	STAND_BY(1, "Stand By"),
	WAITING_REPORT(2, "Waiting Report"),
	REPORT_DONE(3, "Reported"),
	REPORT_CANCELED(4, "Canceled");
	
	private Integer id;
	private String description;
	
	private ReportStatus(Integer id, String description) {
		this.id = id;
		this.description = description;
	}
}
