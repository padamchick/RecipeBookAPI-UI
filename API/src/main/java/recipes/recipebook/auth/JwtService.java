package recipes.recipebook.auth;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import recipes.recipebook.config.JwtTokenUtil;
import recipes.recipebook.dto.JwtRequest;
import recipes.recipebook.dto.JwtResponse;

import java.util.Collection;
import java.util.Date;

@Service
public class JwtService {

    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private UserDetailsService userService;

    public JwtService(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, @Qualifier("userDetailsServiceImpl") UserDetailsService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    public void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new DisabledException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        }
    }

    public JwtResponse createAuthenticationToken(JwtRequest request) throws Exception {

        authenticate(request.getUsername(), request.getPassword());

        final UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        final String username = jwtTokenUtil.getUserNameFromToken(token);
        final Date expirationDate = jwtTokenUtil.getExpirationDateFromToken(token);
        final Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        return new JwtResponse(token, username, expirationDate, authorities);

    }
}
