package recipes.recipebook.auth;

import lombok.AllArgsConstructor;
import org.springframework.data.util.Optionals;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.RecipeBook;
import recipes.recipebook.entity.ShoppingList;
import recipes.recipebook.entity.UserDao;

import java.util.Arrays;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;


    public void registerUser(UserDto userDto) {

        Optionals.ifPresentOrElse(userRepository.findByUsername(userDto.getUsername()),
                user -> { },
                () -> userRepository.save(createUser(userDto)));
    }

    public void deleteUser(Long id) {
        final Optional<UserDao> byId = userRepository.findById(id);
        final UserDao user = byId.orElseThrow(() -> new RuntimeException("User not exists"));
        userRepository.delete(user);
    }

    private UserDao createUser(UserDto userDto) {
        UserDao newUser = new UserDao().builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .authorities(Arrays.asList(authorityRepository.findByName("USER")))
                .language(Language.valueOfLang(userDto.getLanguage()))
                .email(userDto.getEmail())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .build();

        RecipeBook recipeBook = new RecipeBook();
        recipeBook.setUserDao(newUser);
        newUser.setRecipeBook(recipeBook);

        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setUserDao(newUser);
        newUser.setShoppingList(shoppingList);

        return newUser;
    }

}
