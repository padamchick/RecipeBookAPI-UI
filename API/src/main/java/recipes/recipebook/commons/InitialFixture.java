package recipes.recipebook.commons;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import recipes.recipebook.auth.UserService;
import recipes.recipebook.auth.dto.RegistrationRequest;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Category;
import recipes.recipebook.entity.Ingredient;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.recipes.RecipeService;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InitialFixture {
    private final TransactionalService transactionalService;
    private final UserService userService;
    private final RecipeService recipeService;

    @PostConstruct
    public void init() {
        transactionalService.run(this::populateDB);
    }

    public void populateDB() {
        if(userService.countUsers() == 0) {
            createAuthorities(Arrays.asList("ROLE_USER", "ROLE_ADMIN"));

            UserDao user = registerAndFillWithData("piotrek", "piotrek", "piotrek@test.com", "Piotr", "Adamczyk", Language.ENGLISH);

            recipeService.addCategory("Main Dish", "icofont-culinary", 1, "main-dishes");
            recipeService.addCategory("Small Dish", "icofont-fast-food", 2, "small-dishes");
            recipeService.addCategory("Soup", "icofont-soup-bowl", 3, "soups");
            recipeService.addCategory("Dessert", "icofont-cup-cake", 4, "desserts");
            recipeService.addCategory("Drink", "icofont-cocktail", 5, "drinks");
            recipeService.addCategory("Liqueur", "icofont-glass", 6, "liqueurs");

//            recipeService.saveRecipe(RecipeDto.builder()
//                    .name("Shakshuka")
//                    .imagePath("https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg")
//                    .description("Chorizo pokroić na 4, podsmażyć. Dodać pomidory, przyprawić. Wbić jajka i smażyć pod przykryciem około 5-7 minut na dużej mocy kuchenki. Podać z pokrojoną fetą i szczypiorkiem.")
//                    .servings(2)
//                    .preparationTime("15min")
//                    .category(recipeService.findCategoryByName("Small Dish"))
//                    .ingredients(Arrays.asList(
//                            new Ingredient("pomidory w puszce", 1.0f, "szt"),
//                            new Ingredient("jajka", 5f, "szt"),
//                            new Ingredient("chleb", 3f, "kromki"),
//                            new Ingredient("chorizo", 4f, "cm"),
//                            new Ingredient("feta", 1f, null),
//                            new Ingredient("szczypiorek", 1f, "łyżka")
//                    ))
//                    .build(), user.getRecipeBook()
//            );

        }
    }

    private UserDao registerAndFillWithData(String username, String password, String email, String firstName, String lastName, Language language) {
        UserDao userDao = userService.registerUser(username, password, email);

        userDao.getUserData().setFirstName(firstName);
        userDao.getUserData().setLastName(lastName);
        userDao.getUserData().setLanguage(language);

        return userDao;
    }

    private void createAuthorities(List<String> authorities) {
        authorities.forEach(auth -> userService.createAuthority(auth));
    }

}
