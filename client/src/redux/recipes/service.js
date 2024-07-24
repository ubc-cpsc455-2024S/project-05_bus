const addRecipe = async (newRecipe) => {
    const response = await fetch(`http://localhost:3000/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    });
  
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.message;
      throw new Error(errorMsg)
    }
    
    return data;
  };
  
  const getRecipes = async () => {
    const response = await fetch(`http://localhost:3000/recipes`, {
      method: 'GET'
    });
    return response.json();
  };

  const removeRecipe = async (id) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  };

  const generateRecipe = async (list) => {
    const response = await fetch('http://localhost:3000/recipes/generateRecipe', {
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
    addRecipe,
    getRecipes,
    removeRecipe,
    generateRecipe
  };