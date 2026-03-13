package To._do_projectdevelopment.repository;


import To._do_projectdevelopment.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}