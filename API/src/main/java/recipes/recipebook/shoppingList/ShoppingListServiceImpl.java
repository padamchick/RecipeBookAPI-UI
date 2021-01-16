package recipes.recipebook.shoppingList;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.entity.*;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {

    ShoppingListRepository shoppingListRepository;
    UserRepository userRepository;

    public ShoppingListServiceImpl(ShoppingListRepository shoppingListRepository, UserRepository userRepository) {
        this.shoppingListRepository = shoppingListRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ShoppingListItem> getShoppingListItems() {
        final ShoppingList shoppingList = getShoppingList();
        final List<ShoppingListItem> shoppingItems = shoppingListRepository.findAllByShoppingList(shoppingList);
        return shoppingItems;
    }

    @Override
    public List<ShoppingListItem> storeItemsFromRecipe(List<Ingredient> ingredients) {
        final ShoppingList shoppingList = getShoppingList();
        final List<ShoppingListItem> items = ShoppingListMapper.MAPPER.toShoppingListItems(ingredients);
        items.forEach(item -> item.fixAfterMappingFromIngredient(shoppingList));
        return shoppingListRepository.saveAll(items);
    }

    @Override
    public ShoppingListItem addItem(ShoppingListItem item) {
        final ShoppingList shoppingList = getShoppingList();
        item.setShoppingList(shoppingList);
        return shoppingListRepository.save(item);
    }

    @Override
    public ShoppingListItem updateItem(ShoppingListItem item) {
        final Optional<ShoppingListItem> optionalItem = shoppingListRepository.findById(item.getId());
        ShoppingListItem shoppingListItem = optionalItem.orElseThrow(() -> new RuntimeException("Item not exists"));
        item.setShoppingList(shoppingListItem.getShoppingList());
        return shoppingListRepository.save(item);
    }

    @Override
    public ShoppingListItem deleteItem(Long id) {
        final ShoppingListItem shoppingListItem = shoppingListRepository.findById(id).orElseThrow(() -> new RuntimeException("Item no. " + id + " not exists"));
        shoppingListRepository.delete(shoppingListItem);
        return shoppingListItem;
    }


    private ShoppingList getShoppingList() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final ShoppingList shoppingList = user.get().getShoppingList();
        return shoppingList;
    }
}
