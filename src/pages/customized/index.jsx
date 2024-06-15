import React, { useState } from 'react';

export default function Customized() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setData(result.items); // Assuming the result has an 'items' property containing the nutrition data
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

  return (
    <div>
      <h1>Nutrition Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter food items"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <h2>{item.name}</h2>
              <p>Calories: {item.calories}</p>
              <p>Serving Size: {item.serving_size_g}g</p>
              <p>Fat: {item.fat_total_g}g</p>
              <p>Protein: {item.protein_g}g</p>
              <p>Carbohydrates: {item.carbohydrates_total_g}g</p>
              <p>Sugar: {item.sugar_g}g</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No nutrition information available.</p>
      )}
    </div>
  );
};