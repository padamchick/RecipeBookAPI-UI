package recipes.recipebook.restController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping
    public String welcome() {
        return "Welcome page";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Admin panel";
    }
}
