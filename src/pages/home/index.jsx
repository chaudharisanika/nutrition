import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) return <div>Loading...Please wait!</div>;

  return (
    <>
    <div className="flex justify-center items-center h-full w-full">
      <img src="https://media.istockphoto.com/id/1170262672/photo/nutritional-information-concept-hand-use-the-magnifying-glass-to-zoom-in-to-see-the-details.jpg?s=612x612&w=0&k=20&c=RncEH-T_nhYklMRAAXUWmeaQPdmbRxqwBfybnVwt_Pw=" alt="Description"
       className="rounded-lg shadow-lg max-w-xl" />
    </div>
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Search something and get the nutritional information of the dish...
          </p>
        </div>
      )}
    </div>
    </>
  );
}