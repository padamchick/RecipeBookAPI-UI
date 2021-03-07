package recipes.recipebook.recipes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
