package To._do_projectdevelopment.service;


import To._do_projectdevelopment.model.Todo;
import To._do_projectdevelopment.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> getAllTodos() {
        return repo.findAll();
    }

    public Todo createTodo(Todo todo) {
        return repo.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        Todo existing = repo.findById(id).orElseThrow();
        existing.setTitle(todo.getTitle());
        existing.setDescription(todo.getDescription());
//        existing.setCompleted(todo.isCompleted());
        return repo.save(existing);
    }

    public void deleteTodo(Long id) {
        repo.deleteById(id);
    }
}