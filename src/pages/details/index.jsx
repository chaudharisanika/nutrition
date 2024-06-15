import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
  } = useContext(GlobalContext);
  
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }

      // Call the CalorieNinjas API
      const ingredients = data.data.recipe.ingredients.map(ingredient => 
        `${ingredient.quantity} ${ingredient.unit} ${ingredient.description}`
      ).join(', ');
      const query = ingredients;
      axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: { 'X-Api-Key': 'xXYM6lc7dU3NRWuh/d0XXQ==bbc3yBO9gJIWlo07' },
      })
      .then(response => {
        console.log(response.data);
        setNutritionData(response.data);
      })
      .catch(error => {
        console.error('Error: ', error.response.data);
      });
    }

    getRecipeDetails();
  }, []);

  console.log(recipeDetailsData, "recipeDetailsData");

  const totalCalories = nutritionData?.items.reduce((total, item) => total + item.calories, 0) || 0;
  const totalServingSize = nutritionData?.items.reduce((total, item) => total + item.serving_size_g, 0) || 0;

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt=""
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        {nutritionData && (
          <div>
            <span className="text-2xl font-semibold text-black">
              Nutrition Information:
            </span>
            <table className="table-auto w-full mt-5">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Calories</th>
                  <th className="px-4 py-2">Serving Size (g)</th>
                </tr>
              </thead>
              <tbody>
                {nutritionData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.calories}</td>
                    <td className="border px-4 py-2">{item.serving_size_g}</td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-4 py-2 font-bold">Total</td>
                  <td className="border px-4 py-2 font-bold">{totalCalories}</td>
                  <td className="border px-4 py-2 font-bold">{totalServingSize}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
