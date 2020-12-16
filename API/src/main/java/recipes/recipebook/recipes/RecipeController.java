package recipes.recipebook.recipes;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Recipe;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

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
}
