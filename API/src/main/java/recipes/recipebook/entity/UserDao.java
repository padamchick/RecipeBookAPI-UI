package recipes.recipebook.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "[user]")
public class UserDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id"))
    private List<Authority> authorities;

    @OneToOne(mappedBy = "userDao", cascade = CascadeType.ALL)
    private RecipeBook recipeBook;

    private String firstName;
    private String lastName;
    private String email;
    @Enumerated(EnumType.STRING)
    private Language language;

    @OneToOne(mappedBy = "userDao", cascade = CascadeType.ALL)
    private ShoppingList shoppingList;
}
