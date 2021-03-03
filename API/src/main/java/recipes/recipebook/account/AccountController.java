package recipes.recipebook.account;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.auth.UserRepository;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
@AllArgsConstructor
public class AccountController {
    private AccountService accountService;

    @PatchMapping(value="/account", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> partialUpdateGeneric(@RequestBody Map<String, Object> updates) {
        return accountService.update(updates);
    }
}
