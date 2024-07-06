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

const addCategory = async (category) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/category", {
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

const removeCategory = async (category) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/category", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing category:", error);
    throw error;
  }
};

const updateCategory = async (category) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/category", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const addLocation = async (location) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/location", {
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

const removeLocation = async (location) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/location", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing location:", error);
    throw error;
  }
};

const updateLocation = async (location) => {
  try {
    const response = await fetch("http://localhost:3000/groceries/location", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
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
  updateGrocery,
  deleteGrocery,
  addCategory,
  removeCategory,
  updateCategory,
  addLocation,
  removeLocation,
  updateLocation,
};
