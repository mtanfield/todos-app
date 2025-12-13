package com.tanfield.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories("com.tanfield.todo.repository")
@EntityScan("com.tanfield.todo.model")
public class TodoBackendApplication {
  public static void main(String[] args) { SpringApplication.run(TodoBackendApplication.class, args); }
}
