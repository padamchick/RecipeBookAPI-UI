package recipes.recipebook.shoppingList;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;
import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.ShoppingList;
import recipes.recipebook.entity.ShoppingListItem;

import java.util.List;

@Mapper
public interface ShoppingListMapper {

    ShoppingListMapper MAPPER = Mappers.getMapper(ShoppingListMapper.class);


    @Mappings({
            @Mapping(source = "id",target = "id", ignore = true),
            @Mapping(target = "priority", defaultValue = "1")
    })
    ShoppingListItem toShoppingListItem(Ingredient ingredient);

    List<ShoppingListItem> toShoppingListItems(List<Ingredient> ingredients);
}
