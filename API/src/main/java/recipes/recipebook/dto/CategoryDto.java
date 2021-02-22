package recipes.recipebook.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
    private String iconName;
    private Integer sortIndex;
    private String urlSuffix;
}
