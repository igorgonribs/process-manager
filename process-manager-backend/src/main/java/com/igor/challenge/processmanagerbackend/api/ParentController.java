package com.igor.challenge.processmanagerbackend.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE,
		RequestMethod.OPTIONS })
@RestController
public class ParentController {

}
