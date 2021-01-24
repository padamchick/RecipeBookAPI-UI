package recipes.recipebook.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recipes.recipebook.entity.Ingredient;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class RecipeDto {
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    private String category;
    private List<Ingredient> ingredients;
}
