package recipes.recipebook.recipes;

import lombok.AllArgsConstructor;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.ingredients.IngredientMapper;

import java.util.List;

@Mapper(uses = IngredientMapper.class, componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class RecipeMapper {

    private RecipeService recipeService;

    @Mappings({
            @Mapping(ignore = true, target = "category")
    })
    protected abstract Recipe toRecipe(RecipeDto dto);

    @AfterMapping
    protected void setCategory(RecipeDto from, @MappingTarget Recipe recipe) {
        Category category = this.recipeService.findCategoryByName(from.getCategory());
        recipe.setCategory(category);
    }

//    @Mappings({
//            @Mapping(ignore = true, target = "category")
//    })
//    protected abstract RecipeDto toDto(Recipe recipe);

//    @AfterMapping
//    protected void setCategory(Recipe from, @MappingTarget RecipeDto dto) {
//        dto.setCategory(from.getCategory().getName());
//    }

    protected abstract List<Recipe> toRecipeList(List<RecipeDto> dtos);
//    protected abstract List<RecipeDto> toRecipeDtoList(List<Recipe> recipes);



}
