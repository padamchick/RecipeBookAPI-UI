package recipes.recipebook.recipes;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.Recipe;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private RecipeService recipeService;

    @ApiOperation(value = "Return all recipes")
    @GetMapping("/all")
    public List<Recipe> getRecipes() {
        return recipeService.findAll();
    }

    @ApiOperation(value = "Return selected recipe")
    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.findById(id);
    }

    @ApiOperation(value = "Save recipe")
    @PostMapping
    public ResponseEntity<Recipe> saveRecipe(@RequestBody RecipeDto dto) {
        return ResponseEntity.ok(recipeService.saveRecipe(dto));
    }

    @ApiOperation(value = "Update recipe")
    @PutMapping
    public ResponseEntity<Recipe> updateRecipe(@RequestBody RecipeDto dto) {
        return ResponseEntity.ok(recipeService.updateRecipe(dto));
    }

    @ApiOperation(value = "Delete recipe")
    @DeleteMapping("/{id}")
    public ResponseEntity<Recipe> deleteRecipe(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.delete(id));
    }

    @ApiOperation(value = "Delete ingredient")
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> deleteIngredient(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.deleteIngredient(id));
    }

    @ApiOperation(value = "Bulk delete ingredients")
    @PostMapping("/ingredients/bulkDelete")
    public ResponseEntity<?> bulkDeleteIngredients(@RequestBody List<Long> ids) {
        recipeService.bulkDeleteIngredients(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "Bulk delete recipes")
    @PostMapping("/bulkDelete")
    public ResponseEntity<?> bulkDeleteRecipes(@RequestBody List<Long> ids) {
        recipeService.bulkDeleteRecipes(ids);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "Return recipe categories")
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return recipeService.getCategories();
    }

    @ApiOperation(value = "Add list of recipes to authenticated user")
    @PostMapping("/bulkAdd")
    public ResponseEntity<Recipe> bulkAddRecipes(@RequestBody List<Recipe> recipes) {
        recipeService.bulkAddRecipes(recipes);
        return ResponseEntity.created(URI.create("/all")).build();
    }

}
