package To._do_projectdevelopment.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String title;
    @Setter
    @Getter
    private String description;
//    @Setter
//    @Getter
//    private boolean completed;

    public Todo() {
    }

    public Todo(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
//        this.completed = completed;
    }


}