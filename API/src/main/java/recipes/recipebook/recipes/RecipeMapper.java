package recipes.recipebook.recipes;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import recipes.recipebook.dto.CategoryDto;
import recipes.recipebook.dto.IngredientDto;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.ingredients.IngredientMapper;

import java.util.List;

@Mapper(uses = {IngredientMapper.class, CategoryMapper.class}, componentModel = "spring")
public abstract class RecipeMapper {


//    @Mappings({
//            @Mapping(ignore = true, target = "category")
//    })
    protected abstract Recipe toRecipe(RecipeDto dto);

//    @AfterMapping
//    protected void setCategory(RecipeDto from, @MappingTarget Recipe recipe, @Context RecipeService recipeService) {
//        Category category = recipeService.findCategoryByName(from.getCategory().getName());
//        recipe.setCategory(category);
//    }

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

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
interface CategoryMapper {
    CategoryMapper MAPPER = Mappers.getMapper(CategoryMapper.class);

    Category toCategory(CategoryDto dto);
    CategoryDto toDto(Category category);

}
