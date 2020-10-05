package recipes.recipebook.restController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.service.RecipeService;

import java.util.List;

@RestController
//@CrossOrigin("http://localhost:4200")
@RequestMapping("/recipes")
public class RecipeController {

    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/all")
    public List<Recipe> getRecipes() {
        return recipeService.findAll();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Recipe> saveRecipe(@RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.saveRecipe(recipe));
    }

    @PutMapping
    public ResponseEntity<Recipe> updateRecipe(@RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.saveRecipe(recipe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Recipe> deleteRecipe(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.delete(id));
    }
}
