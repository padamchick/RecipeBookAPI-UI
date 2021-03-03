package recipes.recipebook.account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.dto.UserDto;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/accounts")
@AllArgsConstructor
public class AccountController {
    private AccountService accountService;
    private UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        return ResponseEntity.ok(userMapper.toDto(accountService.getCurrentUser()));
    }

    @PatchMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> partialUpdateGeneric(@RequestBody Map<String, Object> updates) {
        return ResponseEntity.ok(userMapper.toDto(accountService.update(updates)));
    }
}
