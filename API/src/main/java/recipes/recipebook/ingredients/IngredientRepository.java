package recipes.recipebook.ingredients;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.Ingredient;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Modifying
    @Query("DELETE FROM Ingredient i " +
            "WHERE i.id in :ids")
    void deleteByIdIn(@Param("ids") List<Long> ids);
}
