package recipes.recipebook.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private float amount;
    private String unit;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;


}
