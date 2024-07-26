const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const addRecipe = async (newRecipe) => {
    const response = await fetch(`${SERVER_URL}/recipes`, {
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
    const response = await fetch(`${SERVER_URL}/recipes`, {
      method: 'GET'
    });
    return response.json();
  };

  const deleteRecipe = async (id) => {
    const response = await fetch(`${SERVER_URL}/recipes/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  };

  const generateRecipe = async (list) => {
    const response = await fetch(`${SERVER_URL}/recipes/generateRecipe`, {
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
    deleteRecipe,
    generateRecipe
  };