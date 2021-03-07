package recipes.recipebook.auth.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class RegistrationRequest {
    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String password;
}
