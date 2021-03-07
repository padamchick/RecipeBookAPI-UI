package recipes.recipebook.auth.validators;

import recipes.recipebook.auth.dto.RegistrationRequest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EqualPasswordValidator implements ConstraintValidator<EqualPassword, RegistrationRequest> {
    @Override
    public void initialize(EqualPassword constraintAnnotation) {    }

    @Override
    public boolean isValid(RegistrationRequest request, ConstraintValidatorContext constraintValidatorContext) {
        return request.getPassword().equals(request.getConfirmPassword());
    }
}
