package recipes.recipebook.service.impl;

import org.springframework.data.util.Optionals;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.repository.AuthorityRepository;
import recipes.recipebook.repository.UserRepository;
import recipes.recipebook.service.RegistrationService;

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

    private UserDao createUser(UserDto userDto) {
        UserDao newUser = new UserDao().builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .authorities(Arrays.asList(authorityRepository.findByName("USER")))
                .build();
        return newUser;
    }

}
