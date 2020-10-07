package recipes.recipebook.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter @Setter
public class RecipeBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "fk_user_id")
    private UserDao userDao;

    @OneToMany(mappedBy = "recipeBook", cascade = CascadeType.ALL)
    private List<Recipe> recipes;

}
