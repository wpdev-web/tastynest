import { currencyFormat } from "../util/formating";
import Button from "./UI/Button";

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
     <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div className="meal-details">
           <h3>{meal.name}</h3> 
            <p className="meal-item-price">{currencyFormat.format(meal.price)}</p>
           <p className="meal-item-description">{meal.description}</p>
        </div>
         
      <p className="meal-item-actions">
          <Button>Add to Cart</Button>
      </p>
      
        </article>
    </li>
  );
}