package recipes.recipebook.service.impl;

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
import recipes.recipebook.service.JwtService;

import java.util.Collection;
import java.util.Date;

@Service
public class JwtServiceImpl implements JwtService {

    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private UserDetailsService userService;

    public JwtServiceImpl(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, UserDetailsService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @Override
    public void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

    }

    @Override
    public JwtResponse createAuthenticationToken(JwtRequest request) throws Exception {

        authenticate(request.getUsername(), request.getPassword());

        final UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);
        final Date expirationDate = jwtTokenUtil.getExpirationDateFromToken(token);
        final Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        return new JwtResponse(token, expirationDate, authorities);

    }
}
