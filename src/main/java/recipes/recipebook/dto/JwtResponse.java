package recipes.recipebook.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

@Getter
@AllArgsConstructor
public class JwtResponse {
    private final String jwttoken;
    private final Date expirationDate;
    private final Collection<? extends GrantedAuthority> authorities;
}
