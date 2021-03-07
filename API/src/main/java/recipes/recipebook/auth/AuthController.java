package recipes.recipebook.auth;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.auth.dto.RegistrationRequest;
import recipes.recipebook.dto.JwtRequest;
import recipes.recipebook.dto.UserDto;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {

    private UserService userService;
    private JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @ApiOperation(value = "Create authentication token")
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        return ResponseEntity.ok(jwtService.createAuthenticationToken(authenticationRequest));
    }

    @ApiOperation(value = "Register new user")
    @PostMapping("/register")
    public void register(@Valid @RequestBody RegistrationRequest request) {
        userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail());
    }

    @ApiOperation(value = "Delete user from database")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
