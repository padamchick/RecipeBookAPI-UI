package recipes.recipebook.ingredients;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.Ingredient;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("DELETE FROM Ingredient i " +
            "WHERE i.id in ?1")
    Void deleteByIdIn(List<Integer> ids);
}
