package recipes.recipebook.service.impl;

import org.springframework.stereotype.Service;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.repository.RecipeRepository;
import recipes.recipebook.service.RecipeService;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe delete(Long id) {
        final Recipe toDelete = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe no. " + id + " not exist! "));
        recipeRepository.delete(toDelete);
        return toDelete;
    }
}
