package recipes.recipebook.service.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.entity.RecipeBook;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.repository.RecipeRepository;
import recipes.recipebook.repository.UserRepository;
import recipes.recipebook.service.RecipeService;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;
    private UserRepository userRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    public Recipe saveRecipe(Recipe recipe) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        recipe.setRecipeBook(recipeBook);
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
