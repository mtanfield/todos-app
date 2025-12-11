package com.tanfield.todo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tanfield.todo.model.TodoItem;

public interface TodoItemRepository extends JpaRepository<TodoItem, UUID> { }
