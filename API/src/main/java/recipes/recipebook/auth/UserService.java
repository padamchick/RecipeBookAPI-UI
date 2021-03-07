package recipes.recipebook.auth;

import lombok.AllArgsConstructor;
import org.springframework.data.util.Optionals;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import recipes.recipebook.auth.dto.RegistrationRequest;
import recipes.recipebook.auth.exceptions.DuplicateUserException;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.*;

import java.util.Arrays;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;

    public long countUsers() { return userRepository.count(); }

    @Transactional
    public UserDao registerUser(String username, String password) {
        Optional<UserDao> foundUser = userRepository.findByUsername(username);
        if(!foundUser.isPresent()) {
            String passwordHash = passwordEncoder.encode(password);
            Authority userAuthority = authorityRepository.findByName("ROLE_USER");
            UserDao userDao = new UserDao(username, passwordHash, Arrays.asList(userAuthority));
            return userRepository.save(userDao);
        } else {
            throw new DuplicateUserException("USERNAME_ALREADY_EXISTS");
        }
    }

    public UserDao deleteUser(Long id) {
        final Optional<UserDao> byId = userRepository.findById(id);
        final UserDao user = byId.orElseThrow(() -> new RuntimeException("USER_NOT_EXISTS"));
        userRepository.delete(user);
        return user;
    }

    public Authority createAuthority(String authorityName) {
        return authorityRepository.save(new Authority(authorityName));
    }

//    private UserDao createUser(UserDto userDto) {
//        UserDao newUser = new UserDao().builder()
//                .username(userDto.getUsername())
//                .password(passwordEncoder.encode(userDto.getPassword()))
//                .authorities(Arrays.asList(authorityRepository.findByName("USER")))
//                .language(Language.valueOfLang(userDto.getLanguage()))
//                .email(userDto.getEmail())
//                .firstName(userDto.getFirstName())
//                .lastName(userDto.getLastName())
//                .build();
//
//        RecipeBook recipeBook = new RecipeBook();
//        recipeBook.setUserDao(newUser);
//        newUser.setRecipeBook(recipeBook);
//
//        ShoppingList shoppingList = new ShoppingList();
//        shoppingList.setUserDao(newUser);
//        newUser.setShoppingList(shoppingList);
//
//        return newUser;
//    }



}
