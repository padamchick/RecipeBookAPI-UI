package recipes.recipebook;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
public class RecipeController {
    @GetMapping
    public String hello() {
        return "Hello";
    }
}
