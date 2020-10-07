package recipes.recipebook.restController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.dto.RecipeDto;
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
    public ResponseEntity<Recipe> saveRecipe(@RequestBody RecipeDto dto) {
        return ResponseEntity.ok(recipeService.saveRecipe(dto));
    }

    @PutMapping
    public ResponseEntity<Recipe> updateRecipe(@RequestBody RecipeDto dto) {
        return ResponseEntity.ok(recipeService.updateRecipe(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Recipe> deleteRecipe(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.delete(id));
    }
}
