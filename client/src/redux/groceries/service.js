const getAllGroceries = async (groupID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/group/${groupID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groceries:", error);
    throw error;
  }
};

const getOneGrocery = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/groceries/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching grocery:", error);
    throw error;
  }
};

const postGrocery = async (grocery) => {
  try {
    const response = await fetch("http://localhost:3000/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grocery),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting grocery:", error);
    throw error;
  }
};

const postManyGroceries = async (groceries) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/many", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groceries),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error posting groceries:", error);
    throw error;
  }
};

const updateGrocery = async (grocery) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/${grocery._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grocery),
      }
    );

    if (response.status === 204) {
      return { deleted: true };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating grocery:", error);
    throw error;
  }
};

const deleteGrocery = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/groceries/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting grocery:", error);
    throw error;
  }
};

const getCategories = async (groupID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/categories/group/${groupID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getCategory = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/categories/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

const addCategory = async (category) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/categories/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing category:", error);
    throw error;
  }
};

const updateCategory = async (category) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/categories/${category._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const getLocations = async (groupID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/locations/group/${groupID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

const getLocation = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/locations/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

const addLocation = async (location) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
};

const deleteLocation = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/locations/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing location:", error);
    throw error;
  }
};

const updateLocation = async (location) => {
  try {
    const response = await fetch(
      `http://localhost:3000/groceries/locations/${location._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

export default {
  getAllGroceries,
  getOneGrocery,
  postGrocery,
  postManyGroceries,
  updateGrocery,
  deleteGrocery,
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
  getLocations,
  getLocation,
  addLocation,
  deleteLocation,
  updateLocation,
};
