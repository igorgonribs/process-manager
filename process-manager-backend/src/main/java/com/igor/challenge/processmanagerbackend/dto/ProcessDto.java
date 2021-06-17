package com.igor.challenge.processmanagerbackend.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.igor.challenge.processmanagerbackend.domain.Report;
import com.igor.challenge.processmanagerbackend.domain.User;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_NULL)
public class ProcessDto {
	private Integer id;
	private String name;
	private String description;
	private String status;
	private String expectedReportDate;
	private List<User> users = new ArrayList<>();
	private List<Report> reports = new ArrayList<>();
	private User createdBy;
}
