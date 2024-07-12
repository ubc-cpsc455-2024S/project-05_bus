const getAllUsers = async () => {
  try {
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

const getGroupMembers = async (groupID) => {
  try {
    const response = await fetch(`http://localhost:3000/users/group/${groupID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching group members: ", error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
};

export default { getAllUsers, getGroupMembers, getUser, addUser, deleteUser};