package com.igor.challenge.processmanagerbackend.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.Data;

@Entity
@Data
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String description;
	private Date reportDate;

	@OneToOne
	@JoinColumn(name = "responsible")
	private User responsible;
	private Integer status;
	
	@OneToOne
	@JoinColumn(name = "process")
	private Report report;

}
