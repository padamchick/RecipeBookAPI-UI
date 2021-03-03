package recipes.recipebook.account;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.UserDao;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccountService {
    private final UserRepository userRepository;

    public ResponseEntity<?> update(Map<String, Object> updates) {
        String authorizedUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDao user = userRepository.findByUsername(authorizedUsername).orElse(null);
        if(user != null) {
            updates.forEach((k,v)-> {
                Field field = ReflectionUtils.findField(UserDao.class, k);
                field.setAccessible(true);
                if(k.equals("language")) {
                    ReflectionUtils.setField(field, user, Language.valueOfLang((String) v));
                } else {
                    ReflectionUtils.setField(field, user, v);
                }
            });
        }
        return ResponseEntity.ok(userRepository.save(user));
    }
}
