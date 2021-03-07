package recipes.recipebook.recipes;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import recipes.recipebook.auth.AuthContext;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.*;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.exceptions.NotFoundException;
import recipes.recipebook.ingredients.IngredientRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@AllArgsConstructor
@Service
public class RecipeService {

    private RecipeRepository recipeRepository;
    private CategoryRepository categoryRepository;
    private IngredientRepository ingredientRepository;
    private UserRepository userRepository;
    private RecipeMapper recipeMapper;
    private AuthContext authContext;

    public Recipe saveRecipe(RecipeDto dto) {
        RecipeBook recipeBook = authContext.getCurrentUser().getRecipeBook();
        return saveRecipe(dto, recipeBook);
    }

    public Recipe saveRecipe(RecipeDto dto, RecipeBook recipeBook) {
        Recipe recipe = recipeMapper.toRecipe(dto);
        recipe.updateWithReferences();
        recipe.setRecipeBook(recipeBook);
        if(recipe.getCreationDate() == null) {
            recipe.setCreationDate(new Date());
        }
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(RecipeDto dto) {
        final Optional<Recipe> recipeOptional = recipeRepository.findById(dto.getId());
        if(recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();
            BeanUtils.copyProperties(dto, recipe, "id", "creationDate");
            recipe.updateWithReferences();
            return recipeRepository.save(recipe);
        } else {
            throw new NotFoundException("RECIPE_NOT_FOUND");
        }
    }

    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public List<Recipe> findAll() {
        final RecipeBook recipeBook = authContext.getCurrentUser().getRecipeBook();
        return recipeRepository.findAllByRecipeBook(recipeBook);
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

    public List<Category> getCategories() {
        List<Category> categories =  categoryRepository.findAll();
        return categories;
    }

    public Category addCategory(String name, String iconName, Integer sortName, String urlSuffix) {
        Category category = new Category(name, iconName, sortName, urlSuffix);
        return categoryRepository.save(category);
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

    @Transactional
    public void bulkAddRecipes(List<Recipe> recipes) {
        UserDao currentUser = authContext.getCurrentUser();
        recipes.forEach(recipe -> {
            recipe.setRecipeBook(currentUser.getRecipeBook());
            recipe.getIngredients().forEach(ingredient -> ingredient.setRecipe(recipe));
        });
        this.recipeRepository.saveAll(recipes);
    }
//
//    @Override
//    public List<String> getAllCategories() {
//        return null;
//    }

}
