package recipes.recipebook.recipes;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import recipes.recipebook.dto.RecipeDto;
import recipes.recipebook.entity.Recipe;
import recipes.recipebook.entity.RecipeBook;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.auth.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;

    public RecipeServiceImpl(RecipeRepository recipeRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Recipe saveRecipe(RecipeDto dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        Recipe recipe = modelMapper.map(dto, Recipe.class);
        recipe.updateWithReferences();
        recipe.setRecipeBook(recipeBook);
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe updateRecipe(RecipeDto dto) {
        final Optional<Recipe> recipeOptional = recipeRepository.findById(dto.getId());
        Recipe recipe = recipeOptional.orElseThrow(() -> new RuntimeException("Recipe not exists"));
        recipe.update(dto);
        recipe.updateWithReferences();
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe findById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Recipe> findAll() {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final Optional<UserDao> user = userRepository.findByUsername(username);
        final RecipeBook recipeBook = user.get().getRecipeBook();
        final List<Recipe> allByRecipeBook = recipeRepository.findAllByRecipeBook(recipeBook);
        return allByRecipeBook;


//        return recipeRepository.findAll();
    }

    @Override
    public Recipe delete(Long id) {
        final Recipe toDelete = recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe no. " + id + " not exist! "));
        recipeRepository.delete(toDelete);
        return toDelete;
    }

}
