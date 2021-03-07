package recipes.recipebook.account;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import recipes.recipebook.auth.AuthContext;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.entity.UserData;
import recipes.recipebook.exceptions.NotFoundException;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {
    private final UserRepository userRepository;
    private final AuthContext authContext;

    public UserDao update(Map<String, Object> updates) {
        UserDao user = authContext.getCurrentUser();
        if(user != null) {
            updates.forEach((k,v)-> {
                Field field = ReflectionUtils.findField(UserData.class, k);
                field.setAccessible(true);
                if(k.equals("language")) {
                    ReflectionUtils.setField(field, user.getUserData(), Language.valueOfLang((String) v));
                } else {
                    ReflectionUtils.setField(field, user.getUserData(), v);
                }
            });
        }
        return userRepository.save(user);
    }

    public UserDao getCurrentUser() {
        String authorizedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(authorizedUsername)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));
    }
}
