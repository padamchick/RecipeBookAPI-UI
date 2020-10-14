package recipes.recipebook.recipes;

import org.springframework.stereotype.Service;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Recipe;

import java.util.List;

public interface RecipeService {

    Recipe saveRecipe(RecipeDto dto);
    Recipe updateRecipe(RecipeDto dto);
    Recipe findById(Long id);
    List<Recipe> findAll();
    Recipe delete(Long id);

}
