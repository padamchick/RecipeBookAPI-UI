package recipes.recipebook.auth.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EqualPasswordValidator.class)
@Documented
public @interface EqualPassword {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

