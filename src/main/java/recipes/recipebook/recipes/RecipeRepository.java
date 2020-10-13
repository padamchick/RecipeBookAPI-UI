package recipes.recipebook.recipes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.entity.RecipeBook;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    List<Recipe> findAllByRecipeBook(RecipeBook recipeBook);
}
