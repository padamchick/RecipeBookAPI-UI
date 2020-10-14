package recipes.recipebook.recipes;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.ingredients.IngredientMapper;

@Mapper(uses = IngredientMapper.class)
public interface RecipeMapper {

    RecipeMapper MAPPER = Mappers.getMapper(RecipeMapper.class);

    Recipe toRecipe(RecipeDto dto);
    RecipeDto toDto(Recipe recipe);

}
