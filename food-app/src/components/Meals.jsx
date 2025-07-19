import MealItem from "./MealItem";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const reqConfig = {};
export default function Meals() {
   const { 
     data: loadedMeals, 
     isLoading, 
     error } = useHttp('http://localhost:3000/meals',reqConfig, []);    

 if (isLoading) {
    return <p className="center">Loading Meals...</p>;
  }

    if (error) {
        return <Error title="Unable to fetch meals data" message={error} />;
    }

  return (
   <ul id="meals">{loadedMeals.map((meals)=>(
    <MealItem meal={meals} key={meals.id} />
   ))}</ul>
  );
}