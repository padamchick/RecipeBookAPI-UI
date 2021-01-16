package recipes.recipebook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class ShoppingListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Float amount;
    private String unit;
    private Integer priority;

    @JsonProperty(value = "isCompleted")
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "shopping_list_id")
    @JsonIgnore
    private ShoppingList shoppingList;

    public void fixAfterMappingFromIngredient(ShoppingList shoppingList) {
        this.priority = 1;
        isCompleted = false;
        this.shoppingList = shoppingList;
    }
}
