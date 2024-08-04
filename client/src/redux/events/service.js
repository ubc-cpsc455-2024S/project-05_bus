const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getAllEvents = async (groupID) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/calendar/group/${groupID}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

const getOneEvent = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/calendar/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

const addEvent = async (event) => {
  try {
    const response = await fetch(`${SERVER_URL}/calendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting event:', error);
    throw error;
  }
};

const updateEvent = async (event) => {
  try {
    const response = await fetch(`${SERVER_URL}/calendar/${event._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/calendar/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export default { getAllEvents, getOneEvent, addEvent, updateEvent, deleteEvent };


