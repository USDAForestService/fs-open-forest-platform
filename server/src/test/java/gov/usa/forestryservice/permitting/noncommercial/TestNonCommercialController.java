package gov.usa.forestryservice.permitting.noncommercial;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import gov.usa.forestryservice.permitting.Main;

@RunWith(SpringRunner.class)
@WebMvcTest(NonCommercialController.class)
@ContextConfiguration(classes = Main.class)
public class TestNonCommercialController {

	private static final String GOOD_JSON_BODY_CONTENT = "{" + "\"region\": \"string\"," + "\"forest\": \"string\","
			+ "\"district\": \"string\"," + "\"authorizingOfficerName\": \"string\","
			+ "\"authorizingOfficerTitle\": \"string\"," + "\"applicantInfo\": {" + "  \"firstName\": \"string\","
			+ "  \"lastName\": \"string\"," + "  \"dayPhone\": {" + "    \"areaCode\": 0," + "    \"number\": 0,"
			+ "    \"extension\": \"string\"," + "    \"type\": \"string\"" + "  }," + "  \"eveningPhone\": {"
			+ "    \"areaCode\": 0," + "    \"number\": 0," + "    \"extension\": \"string\","
			+ "    \"type\": \"string\"" + "  }," + "  \"emailAddress\": \"string\","
			+ "  \"mailingAddress\": \"string\"," + "  \"mailingAddress2\": \"string\","
			+ "  \"mailingCity\": \"string\"," + "  \"mailingState\": \"string\"," + "  \"mailingZIP\": \"string\","
			+ "  \"organizationName\": \"string\"," + "  \"website\": \"string\"," + "  \"orgType\": \"INDIVIDUAL\""
			+ "}," + "\"type\": \"NONCOMMERCIAL\"," + " \"noncommercialFields\": {"
			+ "   \"activityDescription\": \"string\"," + "   \"locationDescription\": \"string\","
			+ "   \"startDateTime\": \"string\"," + "   \"endDateTime\": \"string\"," + "  \"numberParticipants\": 0"
			+ " }}";

	@Autowired
	private MockMvc mvc;

	@Test
	public void testGet() throws Exception {
		this.mvc.perform(get("/noncom/applications")).andExpect(content().string("hello world"));
	}

	@Test
	public void testWithRandomText() throws Exception {
		this.mvc.perform(
				post("/noncom/applications/application").content("some text").contentType(APPLICATION_JSON_UTF8_VALUE))
				.andExpect(status().isBadRequest()).andExpect(content().string("Invalid JSON String"));
	}

	@Test
	public void testWithGoodJson() throws Exception {
		this.mvc.perform(post("/noncom/applications/application").content(GOOD_JSON_BODY_CONTENT)
				.contentType(APPLICATION_JSON_UTF8_VALUE)).andExpect(status().isCreated())
				.andExpect(jsonPath("$.tempControlNumber", is("11111")));
	}

}
