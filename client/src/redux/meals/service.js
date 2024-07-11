const addMeal = async (newMeal) => {
    const response = await fetch(`http://localhost:3000/groceries/meals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMeal)
    });
  
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.message;
      throw new Error(errorMsg)
    }
    
    return data;
  };
  
  const getMeals = async () => {
    const response = await fetch(`http://localhost:3000/groceries/meals`, {
      method: 'GET'
    });
    return response.json();
  };

  const removeMeal = async (id) => {
    const response = await fetch(`http://localhost:3000/groceries/meals/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  };

  const generateMeal = async (list) => {
    const response = await fetch('http://localhost:3000/groceries/generateMeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    });
  
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.message;
      throw new Error(errorMsg)
    }
    
    return data;
  };
  
  export default {
    addMeal,
    getMeals,
    removeMeal,
    generateMeal
  };