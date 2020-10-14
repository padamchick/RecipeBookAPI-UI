package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "fk_user_id")
    private UserDao userDao;

    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL)
    private List<ShoppingListItem> shoppingListItems;
}
