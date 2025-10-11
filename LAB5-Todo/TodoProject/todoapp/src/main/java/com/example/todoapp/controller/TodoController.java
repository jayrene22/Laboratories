package com.example.todoapp.controller;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.TodoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/users/admin/todos")
@CrossOrigin(origins = "*") // ✅ allows access from your HTML frontend
public class TodoController {

    @Autowired
    private TodoRepository repository;

    @GetMapping
    public List<Todo> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return repository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = repository.findById(id).orElseThrow();
        todo.setDescription(todoDetails.getDescription());
        todo.setDone(todoDetails.isDone());
        return repository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

