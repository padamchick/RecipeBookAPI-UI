package recipes.recipebook.service;

import org.springframework.stereotype.Service;
import recipes.recipebook.entity.Recipe;

import java.util.List;

public interface RecipeService {

    Recipe saveRecipe(Recipe recipe);
    Recipe findById(Long id);
    List<Recipe> findAll();
    Recipe delete(Long id);

}
