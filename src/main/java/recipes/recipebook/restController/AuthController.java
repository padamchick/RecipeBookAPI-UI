package recipes.recipebook.restController;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.dto.JwtRequest;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.service.JwtService;
import recipes.recipebook.service.RegistrationService;

@RestController
public class AuthController {

    private RegistrationService registrationService;
    private JwtService jwtService;

    public AuthController(RegistrationService registrationService, JwtService jwtService) {
        this.registrationService = registrationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(jwtService.createAuthenticationToken(authenticationRequest));
    }

    @PostMapping("/register")
    public void register(@RequestBody UserDto user) {
        registrationService.registerUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        registrationService.deleteUser(id);
    }
}
