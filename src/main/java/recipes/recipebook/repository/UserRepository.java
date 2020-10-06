package recipes.recipebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import recipes.recipebook.entity.UserDao;

@Repository
public interface UserRepository extends JpaRepository<UserDao, Long> {
    UserDao findByUsername(String username);
}
