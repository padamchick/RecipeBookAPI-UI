package recipes.recipebook.shoppingList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.ShoppingListItem;

import java.util.List;

@RestController
@RequestMapping("/api/shopping-list")
public class ShoppingListController {

    private ShoppingListService shoppingService;

    public ShoppingListController(ShoppingListService shoppingService) {
        this.shoppingService = shoppingService;
    }

    @GetMapping
    public List<ShoppingListItem> getShoppingListItems() {
        return shoppingService.getShoppingListItems();
    }

    @PostMapping("/from-recipe")
    public ResponseEntity<?> storeItemsFromRecipe(@RequestBody List<Ingredient> ingredients) {
        return ResponseEntity.ok(shoppingService.storeItemsFromRecipe(ingredients));
    }

    @PutMapping
    public ResponseEntity<?> updateItem(@RequestBody ShoppingListItem item) {
        return ResponseEntity.ok(shoppingService.updateItem(item));
    }

    @PostMapping
    public ResponseEntity<?> addItem(@RequestBody ShoppingListItem item) {
        return ResponseEntity.ok(shoppingService.addItem(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        return ResponseEntity.ok(shoppingService.deleteItem(id));
    }
}
