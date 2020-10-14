package recipes.recipebook.shoppingList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.ShoppingList;
import recipes.recipebook.entity.ShoppingListItem;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingListItem, Long> {

    List<ShoppingListItem> findAllByShoppingList(ShoppingList shoppingList);
}
