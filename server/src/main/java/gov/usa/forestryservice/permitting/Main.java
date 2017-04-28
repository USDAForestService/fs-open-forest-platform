package gov.usa.forestryservice.permitting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan
public class Main {

	public Main() {
		// empty for now
	}

	public static void main(String... args) {
		SpringApplication.run(Main.class, args);
	}

}
