package recipes.recipebook.shoppingList;

import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.ShoppingListItem;

import java.util.List;

public interface ShoppingListService {

    List<ShoppingListItem> getShoppingListItems();

    List<ShoppingListItem> storeItemsFromRecipe(List<Ingredient> ingredients);

    ShoppingListItem addItem(ShoppingListItem item);

    ShoppingListItem updateItem(ShoppingListItem item);

    ShoppingListItem deleteItem(Long id);
}
