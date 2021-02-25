package recipes.recipebook.recipes;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.*;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.ingredients.IngredientRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Service
public class RecipeService {

    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private UserRepository userRepository;
    private RecipeMapper recipeMapper;
//    private ModelMapper modelMapper;

    public Recipe saveRecipe(RecipeDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        Recipe recipe = recipeMapper.toRecipe(dto, this);
//        Recipe recipe = modelMapper.map(dto, Recipe.class);
        recipe.updateWithReferences();
        recipe.setRecipeBook(recipeBook);
        if(recipe.getCreationDate() == null) {
            recipe.setCreationDate(new Date());
        }
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(RecipeDto dto) {
        final Optional<Recipe> recipeOptional = recipeRepository.findById(dto.getId());
        Recipe recipe = recipeOptional.orElseThrow(() -> new RuntimeException("Recipe not exists"));
        recipe.update(dto);
        recipe.setCategory(findCategoryByName(dto.getCategory().getName()));
        recipe.updateWithReferences();
        return recipeRepository.save(recipe);
    }

    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public List<Recipe> findAll() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        final List<Recipe> allByRecipeBook = recipeRepository.findAllByRecipeBook(recipeBook);
        return allByRecipeBook;


//        return recipeRepository.findAll();
    }

    public Recipe delete(Long id) {
        final Recipe toDelete = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe no. " + id + " not exist! "));
        recipeRepository.delete(toDelete);
        return toDelete;
    }

    public Ingredient deleteIngredient(Long id) {
        final Ingredient toDelete = ingredientRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe no. " + id + " not exist! "));
        ingredientRepository.delete(toDelete);
        return toDelete;
    }

    public Set<Category> getCategories() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        Set<Category> categories = recipeRepository.findRecipeBookCategories(recipeBook);
        return categories;
    }

    public Category findCategoryByName(String name) {
        return recipeRepository.findCategoryByName(name);
    }

    @Transactional
    public void bulkDeleteIngredients(List<Long> ids) {
       this.ingredientRepository.deleteByIdIn(ids);
    }

    @Transactional
    public void bulkDeleteRecipes(List<Long> ids) {
        this.recipeRepository.deleteByIdIn(ids);
    }
//
//    @Override
//    public List<String> getAllCategories() {
//        return null;
//    }

}
