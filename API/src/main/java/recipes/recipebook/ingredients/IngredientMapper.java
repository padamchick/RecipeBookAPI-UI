package recipes.recipebook.ingredients;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import recipes.recipebook.dto.IngredientDto;
import recipes.recipebook.entity.Ingredient;

@Mapper
public interface IngredientMapper {

    IngredientMapper MAPPER = Mappers.getMapper(IngredientMapper.class);

    Ingredient toIngredient(IngredientDto dto);
    IngredientDto toDto(Ingredient ingredient);

}
