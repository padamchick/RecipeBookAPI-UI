package recipes.recipebook.auth.dto;

import lombok.Getter;
import lombok.Setter;
import recipes.recipebook.auth.validators.EqualPassword;
import recipes.recipebook.auth.validators.UniqueEmail;
import recipes.recipebook.auth.validators.UniqueUsername;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter @Setter
@EqualPassword(message = "PASSWORDS_NOT_EQUAL")
public class RegistrationRequest {
    @NotBlank
    @UniqueUsername(message = "USERNAME_ALREADY_TAKEN")
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    private String confirmPassword;

    @NotBlank
    @UniqueEmail(message = "EMAIL_ALREADY_TAKEN")
    private String email;

}
