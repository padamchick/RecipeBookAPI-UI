package recipes.recipebook.auth;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.dto.JwtRequest;
import recipes.recipebook.dto.UserDto;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {

    private RegistrationService registrationService;
    private JwtService jwtService;

    public AuthController(RegistrationService registrationService, JwtService jwtService) {
        this.registrationService = registrationService;
        this.jwtService = jwtService;
    }

    @ApiOperation(value = "Create authentication token")
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        return ResponseEntity.ok(jwtService.createAuthenticationToken(authenticationRequest));
    }

    @ApiOperation(value = "Register new user")
    @PostMapping("/register")
    public void register(@RequestBody UserDto user) {
        registrationService.registerUser(user);
    }

    @ApiOperation(value = "Delete user from database")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        registrationService.deleteUser(id);
    }
}
