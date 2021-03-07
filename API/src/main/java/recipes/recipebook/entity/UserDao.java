package recipes.recipebook.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "[user]")
public class UserDao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id"))
    private List<Authority> authorities;

    @OneToOne(mappedBy = "userDao", cascade = CascadeType.ALL)
    private UserData userData;

    @OneToOne(mappedBy = "userDao", cascade = CascadeType.ALL)
    private RecipeBook recipeBook;

    @OneToOne(mappedBy = "userDao", cascade = CascadeType.ALL)
    private ShoppingList shoppingList;

    public UserDao(String username, String password, String email, List<Authority> authorities) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
        this.recipeBook = new RecipeBook(this);
//        this.shoppingList = new ShoppingList(this);
        this.userData = new UserData(this);
    }
}
