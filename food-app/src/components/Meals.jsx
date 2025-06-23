import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  
   const [loadedMeals, setLoadedMeals]= useState([]);
   useEffect(() => {
    async function fetchMeals() {
        // ...existing code...
        const response = await fetch('http://localhost:3000/meals');
        // ...existing code...   
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const meals= await response.json();
        setLoadedMeals(meals);
    }

    fetchMeals();

   }, []);
   

  return (
   <ul id="meals">{loadedMeals.map((meals)=>(
    <MealItem meal={meals} key={meals.id} />
   ))}</ul>
  );
}