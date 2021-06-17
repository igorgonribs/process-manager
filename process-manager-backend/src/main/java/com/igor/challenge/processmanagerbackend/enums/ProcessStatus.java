package com.igor.challenge.processmanagerbackend.enums;

import com.igor.challenge.processmanagerbackend.exception.InvalidStatusException;

import lombok.Getter;

@Getter
public enum ProcessStatus {

	CREATED(1, "Criado"), RUNNING(2, "Executando Processo"), WAITING_REPORT(3, "Aguardando parecer"),
	SUCCESS(4, "Sucesso"), FAILED(5, "Insucesso"), CANCELED(6, "Cancelado");

	private Integer id;
	private String description;

	private ProcessStatus(Integer id, String description) {
		this.id = id;
		this.description = description;
	}

	public static Integer getIdByDescription(String description) throws Exception {
		for (ProcessStatus status : ProcessStatus.values()) {
			if (description.equals(status.description))
				return status.id;
		}
		throw new InvalidStatusException("Invalid Process Status");
	}

	public static String getDescriptionById(Integer id) throws Exception {
		for(ProcessStatus status : ProcessStatus.values()) {
			if(status.id == id)
				return status.description;
		}
		throw new InvalidStatusException("Invalid Process Status");
	}

}
