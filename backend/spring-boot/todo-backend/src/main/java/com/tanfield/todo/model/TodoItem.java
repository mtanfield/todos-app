package com.tanfield.todo.model;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "todos")
public class TodoItem {
    @Id
    @UuidGenerator
    private UUID id;

    private String title;
    private String description;
    private boolean completed;

    public TodoItem() {
    }

    public TodoItem(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}