package com.igor.challenge.processmanagerbackend.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Process {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String description;
	private Integer status;
	private Date expectedReportDate;
	
	@OneToOne
	@JoinColumn(name = "report")
	private Report report;

	@OneToOne
	@JoinColumn(name = "created_by")
	private User createdBy;	

}
