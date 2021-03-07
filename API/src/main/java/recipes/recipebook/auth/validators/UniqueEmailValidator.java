package recipes.recipebook.auth.validators;

import org.springframework.beans.factory.annotation.Autowired;
import recipes.recipebook.auth.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired
    UserRepository userRepository;

    @Override
    public void initialize(UniqueEmail constraintAnnotation) {

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || userRepository.findByEmail(value).isEmpty();
    }
}
