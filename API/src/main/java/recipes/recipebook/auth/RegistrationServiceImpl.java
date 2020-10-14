package recipes.recipebook.auth;

import org.springframework.data.util.Optionals;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.RecipeBook;
import recipes.recipebook.entity.UserDao;

import java.util.Arrays;
import java.util.Optional;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    public RegistrationServiceImpl(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(UserDto userDto) {

        Optionals.ifPresentOrElse(userRepository.findByUsername(userDto.getUsername()),
                user -> { },
                () -> userRepository.save(createUser(userDto)));
    }

    @Override
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
                .build();
        RecipeBook newRecipeBook = new RecipeBook();
        newRecipeBook.setUserDao(newUser);
        newUser.setRecipeBook(newRecipeBook);

        return newUser;
    }

}
