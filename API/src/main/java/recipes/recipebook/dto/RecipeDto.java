package recipes.recipebook.dto;

import lombok.*;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Ingredient;

import java.util.Date;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDto {
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    private Category category;
    private Integer servings;
    private Integer kcal;
    private String preparationTime;
    private Date creationDate;
    private List<Ingredient> ingredients;
}
