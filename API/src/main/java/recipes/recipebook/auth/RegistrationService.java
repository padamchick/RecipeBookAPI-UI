package recipes.recipebook.auth;

import recipes.recipebook.dto.UserDto;

public interface RegistrationService {
    void registerUser(UserDto userDto);
    void deleteUser(Long id);
}
