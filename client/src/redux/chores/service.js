const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getAllChores = async (groupID) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/chores/group/${groupID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chores:", error);
    throw error;
  }
};

const getOneChore = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/chores/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chore:", error);
    throw error;
  }
};

const addChore = async (chore) => {
  try {
    const response = await fetch(`${SERVER_URL}/chores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chore),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting chore:", error);
    throw error;
  }
};

const updateChore = async (chore) => {
  try {
    const response = await fetch(`${SERVER_URL}/chores/${chore._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chore),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating chore:", error);
    throw error;
  }
};

const deleteChore = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/chores/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting chore:", error);
    throw error;
  }
};

export default { getAllChores, getOneChore, addChore, updateChore, deleteChore };