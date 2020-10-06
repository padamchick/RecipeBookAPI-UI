package recipes.recipebook.service.impl;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import recipes.recipebook.entity.Authority;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.repository.UserRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserDao> user = Optional.ofNullable(userRepository.findByUsername(username));
        final UserDao foundUser = user.orElseThrow(() -> new UsernameNotFoundException("UserDao with username: " + username + " not found."));
        return new User(foundUser.getUsername(), foundUser.getPassword(), mapListToCollection(foundUser.getAuthorities()));
    }

    private Collection<? extends GrantedAuthority> mapListToCollection(List<Authority> authorities) {
        return authorities.stream().map(authority -> new SimpleGrantedAuthority(authority.getName())).collect(Collectors.toList());
    }
}
