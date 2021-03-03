package recipes.recipebook.account;

import org.mapstruct.*;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.UserDao;

import java.util.List;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class UserMapper {

    @Mappings({
            @Mapping(ignore = true, target = "language"),
            @Mapping(ignore = true, target = "password")
    })
    protected abstract UserDto toDto(UserDao from);

    @AfterMapping
    protected void setLanguage(UserDao from, @MappingTarget UserDto dto) {
        if (from.getLanguage() != null) {
            dto.setLanguage(Language.getLang(from.getLanguage()));
        }
    }

    protected abstract List<UserDto> toDtoList(List<UserDao> fromList);

}
