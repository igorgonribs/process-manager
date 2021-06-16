package com.igor.challenge.processmanagerbackend;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.igor.challenge.processmanagerbackend.domain.Process;
import com.igor.challenge.processmanagerbackend.domain.Profile;
import com.igor.challenge.processmanagerbackend.domain.Report;
import com.igor.challenge.processmanagerbackend.domain.User;
import com.igor.challenge.processmanagerbackend.enums.ProcessStatus;
import com.igor.challenge.processmanagerbackend.repository.ProcessRepository;
import com.igor.challenge.processmanagerbackend.repository.ProfileRepository;
import com.igor.challenge.processmanagerbackend.repository.ReportRepository;
import com.igor.challenge.processmanagerbackend.repository.UserRepository;

@SpringBootApplication
public class ProcessManagerBackendApplication implements CommandLineRunner {

	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProcessRepository processRepository;

	@Autowired
	private ReportRepository reportRepository;

	public static void main(String[] args) {
		SpringApplication.run(ProcessManagerBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		loadDatabaseEntries();
	}

	private void loadDatabaseEntries() throws ParseException {

		// Create profiles
		Profile adminProfile = new Profile(null, "Administrador");
		Profile triageProfile = new Profile(null, "Triagem");
		Profile normalProfile = new Profile(null, "Operador");
		profileRepository.saveAll(Arrays.asList(adminProfile, triageProfile, normalProfile));

		// Create users
		User adminUser = new User(null, "11094463655", "Igor Gonçalves Ribeiro Silva", adminProfile);
		User triageUser = new User(null, "21745651020", "Maria da Silva", triageProfile);
		User normalUser = new User(null, "06698638072", "José Pereira", normalProfile);
		userRepository.saveAll(Arrays.asList(adminUser, triageUser, normalUser));

		// Create reports
		Report report1 = new Report(null, "Processo executado com sucesso.", new Date(), normalUser);
		Report report2 = new Report(null, "Processo não foi executado com sucesso.", new Date(), normalUser);
		Report report3 = new Report(null, "Processo cancelado por falta de insumos.", new Date(), normalUser);
		reportRepository.saveAll(Arrays.asList(report1, report2, report3));

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		// Create processes
		Process process1 = new Process(null, "Processo 1", "Processo de teste 1, status Criado",
				ProcessStatus.CREATED.getId(), sdf.parse("30/06/2021 12:00"), null, triageUser);
		Process process2 = new Process(null, "Processo 2", "Processo de teste 2, status Rodando",
				ProcessStatus.RUNNING.getId(), sdf.parse("30/06/2021 09:00"), null, triageUser);
		Process process3 = new Process(null, "Processo 3", "Processo de teste 3, status Aguardando Report",
				ProcessStatus.WAITING_REPORT.getId(), sdf.parse("20/06/2021 10:00"), null, triageUser);
		Process process4 = new Process(null, "Processo 4", "Processo de teste 4, status Executado",
				ProcessStatus.SUCCESS.getId(), sdf.parse("17/06/2021 12:00"), report1, triageUser);
		Process process5 = new Process(null, "Processo 5", "Processo de teste 6, status Insucesso",
				ProcessStatus.FAILED.getId(), sdf.parse("17/06/2021 12:00"), report2, triageUser);
		Process process6 = new Process(null, "Processo 6", "Processo de teste 7, status Cancelado",
				ProcessStatus.CANCELED.getId(), sdf.parse("17/06/2021 12:00"), report3, triageUser);
		processRepository.saveAll(Arrays.asList(process1, process2, process3, process4, process5, process6));

	}

}
