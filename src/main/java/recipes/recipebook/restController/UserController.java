package recipes.recipebook.restController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.service.RegistrationService;
import recipes.recipebook.service.impl.RegistrationServiceImpl;

@RestController
@RequestMapping("/users")
public class UserController {

    private RegistrationService registrationService;

    public UserController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public void register(@RequestBody UserDto user) {
        registrationService.registerUser(user);
    }
}
