package com.genspark.LocalBuySellAPI;

import com.genspark.LocalBuySellAPI.Security.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class LocalBuySellApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(LocalBuySellApiApplication.class, args);
	}

}
