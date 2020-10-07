package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recipes.recipebook.dto.RecipeDto;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    private String name;
    @Column(length = 3000)
    private String description;
    private String image;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;

    @ManyToOne
    @JoinColumn(name = "recipe_book_id")
    @JsonIgnore
    private RecipeBook recipeBook;

    public Recipe update(RecipeDto dto) {
        this.name = dto.getName();
        this.description = dto.getDescription();
        this.image = dto.getDescription();
        this.ingredients = dto.getIngredients();
        return this;
    }

    public void updateWithReferences() {
        ingredients.forEach(ing -> ing.setRecipe(this));
    }



}
