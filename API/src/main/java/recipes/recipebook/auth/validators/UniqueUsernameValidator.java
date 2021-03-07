package recipes.recipebook.auth.validators;

import org.springframework.beans.factory.annotation.Autowired;
import recipes.recipebook.auth.UserRepository;
import recipes.recipebook.auth.dto.RegistrationRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
    @Autowired
    UserRepository userRepository;

    @Override
    public void initialize(UniqueUsername constraintAnnotation) { }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        return userRepository.findByUsername(value).isEmpty();
    }
}
