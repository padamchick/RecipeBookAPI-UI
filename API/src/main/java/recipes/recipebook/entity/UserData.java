package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIgnore
    private UserDao userDao;

    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private Language language;

    public UserData(UserDao userDao) {
        this.userDao = userDao;
    }
}
