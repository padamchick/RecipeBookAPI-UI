package recipes.recipebook.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Ingredient;

import java.util.Date;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class RecipeDto {
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    private CategoryDto category;
    private Integer servings;
    private Integer kcal;
    private String preparationTime;
    private Date creationDate;
    private List<Ingredient> ingredients;
}
