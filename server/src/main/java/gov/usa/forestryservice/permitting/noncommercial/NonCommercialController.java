package gov.usa.forestryservice.permitting.noncommercial;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;

import gov.usa.forestryservice.permitting.noncommercial.model.NonCommercialPermitApplication;

@RestController
public class NonCommercialController {

	public NonCommercialController() {
		// empty for now
	}

	@RequestMapping(value = "/noncom/applications", method = RequestMethod.GET)
	public String getApplications() {

		return "hello world";
	}

	@ResponseStatus(value = HttpStatus.CREATED)
	@RequestMapping(value = "/noncom/applications/application", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public NonCommercialPermitApplication addApplication(@RequestBody NonCommercialPermitApplication app,
			HttpServletResponse response) {

		app.setTempControlNumber("11111");

		return app;
	}

	@ExceptionHandler(JsonParseException.class)
	public ResponseEntity<String> handleJsonParseException(JsonParseException ex) {

		ex.printStackTrace();

		ResponseEntity<String> responseEntity = new ResponseEntity<>("Invalid JSON String", HttpStatus.BAD_REQUEST);

		return responseEntity;
	}

}
