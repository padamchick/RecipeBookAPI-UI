package recipes.recipebook.recipes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.entity.RecipeBook;

import java.util.List;
import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {


    List<Recipe> findAllByRecipeBook(RecipeBook recipeBook);

    @Query("SELECT r.category FROM Recipe r " +
            "WHERE r.recipeBook = :recipeBook")
    Set<Category> findRecipeBookCategories(@Param("recipeBook") RecipeBook recipeBook);

    @Query("SELECT c FROM Category c")
    Set<Category> findAllCategories();

    @Query("SELECT c FROM Category c " +
            "WHERE c.name = :categoryName")
    Category findCategoryByName(@Param("categoryName") String name);

    @Modifying
    @Query("DELETE FROM Recipe r " +
            "WHERE r.id in :ids")
    void deleteByIdIn(@Param("ids") List<Long> ids);


}
