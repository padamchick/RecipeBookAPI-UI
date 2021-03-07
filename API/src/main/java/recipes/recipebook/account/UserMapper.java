package recipes.recipebook.account;

import org.mapstruct.*;
import recipes.recipebook.dto.UserDto;
import recipes.recipebook.entity.Language;
import recipes.recipebook.entity.UserDao;
import recipes.recipebook.entity.UserData;

import java.util.List;

@Mapper(uses = UserMapper.UserDataMapper.class, componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class UserMapper {

    protected abstract UserDto toDto(UserDao from);

    @AfterMapping
    protected void setLanguage(UserDao from, @MappingTarget UserDto dto) {
        if (from.getUserData().getLanguage() != null) {
            dto.getUserData().setLanguage(Language.getLang(from.getUserData().getLanguage()));
        }
    }

    protected abstract List<UserDto> toDtoList(List<UserDao> fromList);

    @Mapper(componentModel = "spring")
    public static abstract class UserDataMapper {
        @Mappings({
                @Mapping(ignore = true, target = "language")
        })
        protected abstract UserDto.UserDataDto toDto(UserData from);

    }

}
