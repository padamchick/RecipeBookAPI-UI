package recipes.recipebook.service;

import recipes.recipebook.dto.UserDto;

public interface RegistrationService {
    void registerUser(UserDto userDto);
    void deleteUser(Long id);
}
