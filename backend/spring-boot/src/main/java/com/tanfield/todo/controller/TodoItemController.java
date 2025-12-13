package com.tanfield.todo.controller;

import com.tanfield.todo.model.TodoItem;
import com.tanfield.todo.repository.TodoItemRepository;

import java.util.UUID;
import java.util.List;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
public class TodoItemController {
	
	private final TodoItemRepository todoItemRepository;

	public TodoItemController(TodoItemRepository todoItemRepository) {
		this.todoItemRepository = todoItemRepository;
	}

	@GetMapping
	public ResponseEntity<List<TodoItem>> getAllTodoItems() {
		List<TodoItem> todoItems = todoItemRepository.findAll();
		return ResponseEntity.ok(todoItems);
	}

	@PostMapping
	public ResponseEntity<TodoItem> createTodoItem(@RequestBody TodoItem todoItem) {
		if (todoItem == null) {
			return ResponseEntity.badRequest().build();
		}

		TodoItem savedItem = todoItemRepository.save(todoItem);
		return ResponseEntity.ok(savedItem);
	}

	@PutMapping("/{id}")
	public ResponseEntity<TodoItem> updateTodoItem(@PathVariable UUID id, @RequestBody TodoItem todoItem) {
		if (id == null) {
			return ResponseEntity.badRequest().build();
		}

		return todoItemRepository.findById(id)
				.map(existingItem -> {
					existingItem.setTitle(todoItem.getTitle());
					existingItem.setDescription(todoItem.getDescription());
					existingItem.setCompleted(todoItem.isCompleted());
					TodoItem updatedItem = todoItemRepository.save(existingItem);
					return ResponseEntity.ok(updatedItem);
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteTodoItem(@PathVariable UUID id) {
		if (id == null) {
			return ResponseEntity.badRequest().build();
		}

		return todoItemRepository.findById(id)
				.map(existingItem -> {
					todoItemRepository.delete(Objects.requireNonNull(existingItem));
					return ResponseEntity.noContent().<Void>build();
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}