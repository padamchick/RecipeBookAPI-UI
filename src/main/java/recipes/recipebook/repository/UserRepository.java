package recipes.recipebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.UserDAO;

@Repository
public interface UserRepository extends JpaRepository<UserDAO, Long> {
    UserDAO findByUsername(String username);
}
