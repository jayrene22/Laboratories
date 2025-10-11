package com.example.todoapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private boolean done = false;

    private LocalDateTime createdAt = LocalDateTime.now(); // ✅ auto timestamp
}
