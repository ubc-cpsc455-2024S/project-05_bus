const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getAllUsers = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users: ', error);
    throw error;
  }
};

const getGroupMembers = async (groupID) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/group/${groupID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching group members: ', error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user: ', error);
    throw error;
  }
};

const postUserByEmail = async (email) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/userInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user: ', error);
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const response = await fetch(`${SERVER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error adding user: ${error}`);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    throw error;
  }
};

const updateUserName = async (id, nameData) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nameData),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('Error updating user name: ', error);
    throw error;
  }
};

export default { getAllUsers, getGroupMembers, getUser, addUser, postUserByEmail, deleteUser, updateUserName};