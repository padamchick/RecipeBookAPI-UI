package recipes.recipebook.dto;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class UserDto {
    private Long id;
    private String username;
    private UserDataDto userData;

    @Getter @Setter
    public static class UserDataDto {
        private String firstName;
        private String lastName;
        private String email;
        private String language;
    }
}
