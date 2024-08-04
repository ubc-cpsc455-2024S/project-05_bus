const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getAllGroups = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/groups`);
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error fetching groups: ', error);
    throw error;
  }
};

const getGroup = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/${id}`);
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error fetching group: ', error);
    throw error;
  }
};

const createGroup = async (group) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error creating group: ', error);
    throw error;
  }
};

const updateGroupName = async (id, nameData) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/${id}`, {
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
    console.error('Error updating group name: ', error);
    throw error;
  }
};

const addGroupMember = async (groupID, userID) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/${groupID}/${userID}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error adding group member: ', error);
    throw error;
  }
};

const removeGroupMember = async (groupID, userID) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/remove/${groupID}/${userID}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error removing group member: ', error);
    throw error;
  }
};

const addAdmin = async (groupID, userID) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/admins/${groupID}/${userID}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error adding group admin: ', error);
    throw error;
  }
}; 

const removeAdmin = async (groupID, userID) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/admins/remove/${groupID}/${userID}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error removing group admin: ', error);
    throw error;
  }
};

const deleteGroup = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/groups/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.error || 'An error occurred';
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting group: ', error);
    throw error;
  }
};

export default { 
  getAllGroups,
  getGroup,
  createGroup,
  updateGroupName,
  addGroupMember,
  removeGroupMember,
  addAdmin,
  removeAdmin,
  deleteGroup
};