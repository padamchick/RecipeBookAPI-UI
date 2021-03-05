package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recipes.recipebook.dto.RecipeDto;

import javax.persistence.*;
import java.util.Date;
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
    private String imagePath;
    private Integer servings;
    private Integer kcal;
    private String preparationTime;
    private Date creationDate;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;

    @ManyToOne
    @JoinColumn(name = "recipe_book_id")
    @JsonIgnore
    private RecipeBook recipeBook;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public void update(RecipeDto dto) {
        this.name = dto.getName();
        this.description = dto.getDescription();
        this.imagePath = dto.getImagePath();
        this.ingredients = dto.getIngredients();
        this.creationDate = dto.getCreationDate();
        this.kcal = dto.getKcal();
        this.servings = dto.getServings();
        this.preparationTime = dto.getPreparationTime();
        this.category = new Category().builder()
                .id(dto.getCategory().getId())
                .iconName(dto.getCategory().getIconName())
                .name(dto.getCategory().getName())
                .urlSuffix(dto.getCategory().getUrlSuffix())
                .sortIndex(dto.getCategory().getSortIndex())
                .build();
    }

    public void updateWithReferences() {
        ingredients.forEach(ing -> ing.setRecipe(this));
    }



}
