package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String iconName;
    private Integer sortIndex;
    private String urlSuffix;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Recipe> recipe;

    public Category(String name, String iconName, Integer sortIndex, String urlSuffix) {
        this.name = name;
        this.iconName = iconName;
        this.sortIndex = sortIndex;
        this.urlSuffix = urlSuffix;
    }
}
