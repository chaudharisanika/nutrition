import React, { useState } from 'react';

export default function Customized() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const totalCalories = data?.reduce((total, item) => total + item.calories, 0) || 0;
  const totalServingSize = data?.reduce((total, item) => total + item.serving_size_g, 0) || 0;
  const totalFat = data?.reduce((total, item) => total + item.fat_total_g, 0) || 0;
  const totalProtein = data?.reduce((total, item) => total + item.protein_g, 0) || 0;
  const totalCarbohydrates = data?.reduce((total, item) => total + item.carbohydrates_total_g, 0) || 0;
  const totalSugar = data?.reduce((total, item) => total + item.sugar_g, 0) || 0;
  


  const fetchData = async (searchQuery) => {
    const apiKey = 'xXYM6lc7dU3NRWuh/d0XXQ==bbc3yBO9gJIWlo07';
    try {
      setLoading(true);
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${searchQuery}`, {
        method: 'GET',
        headers: { 'X-Api-Key': apiKey },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result.items); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchData(query);
    }
  };
  

  const isHealthy = totalCalories <= 2000 & totalFat<=100 & totalProtein<=60 & totalCarbohydrates<=300 & totalSugar<=100;

  return (
    <div>
      <div>
      <h1 className='text-center font-bold text-4xl text-black font-serif'>Enter the ingredients of the customized recipe...</h1>
      <form onSubmit={handleSubmit} className='flex justify-center items-center'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Customized recipe"
          className='bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-black-100 focus:shadow-black-200 mt-10'
        />
        {/* <button type="submit">Search</button> */}
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      </div>
      <div className={`mt-5 text-center font-serif text-black text-3xl font-bold ${isHealthy ? 'text-green-500' : 'text-red-500'}`}>
            {isHealthy ? 'This recipe is healthy to eat' : 'This recipe is not healthy to eat'}
        </div>
      {data && data.length > 0 ? (
        // <h1 className='text-center'>Nutrition Information</h1>
        
        <table className="table-auto w-full mt-5">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Calories</th>
              <th className="px-4 py-2">Serving Size (g)</th>
              <th className="px-4 py-2">Fat (g)</th>
              <th className="px-4 py-2">Protein (g)</th>
              <th className="px-4 py-2">Carbohydrates (g)</th>
              <th className="px-4 py-2">Sugar (g)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.calories}</td>
                <td className="border px-4 py-2">{item.serving_size_g}</td>
                <td className="border px-4 py-2">{item.fat_total_g}</td>
                <td className="border px-4 py-2">{item.protein_g}</td>
                <td className="border px-4 py-2">{item.carbohydrates_total_g}</td>
                <td className="border px-4 py-2">{item.sugar_g}</td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 font-bold">Total</td>
              <td className="border px-4 py-2 font-bold">{totalCalories}</td>
              <td className="border px-4 py-2 font-bold">{totalServingSize}</td>
              <td className="border px-4 py-2 font-bold">{totalFat}</td>
              <td className="border px-4 py-2 font-bold">{totalProtein}</td>
              <td className="border px-4 py-2 font-bold">{totalCarbohydrates}</td>
              <td className="border px-4 py-2 font-bold">{totalSugar}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        !loading && !error && <p className='text-center text-3xl font-serif text-black mt-10'>No nutrition information available.</p>
      )}
    </div>
  );
};