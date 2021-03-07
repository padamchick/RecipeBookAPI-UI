package recipes.recipebook.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import recipes.recipebook.entity.UserDao;

@Component
@RequiredArgsConstructor
public class AuthContext {
    private final UserRepository userRepository;

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public UserDao getCurrentUser() {
        if(this.getAuthentication() == null || !this.getAuthentication().isAuthenticated()) {
            return null;
        }

        String currentUsername = this.getAuthentication().getName();
        return userRepository.findByUsername(currentUsername).orElse(null);
    }
}
