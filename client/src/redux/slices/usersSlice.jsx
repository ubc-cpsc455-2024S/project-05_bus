import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      _id: "668053007522f05c47e32853",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      groupID: "6680530d7522f05c47e32859"
    },
    {
      _id: "668053007522f05c47e32854",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "password456",
      groupID: "6680530d7522f05c47e32859"
    }
  ],
  currentUserID: "668053007522f05c47e32853"
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
      createUser: (state, action) => {
        if (!state.users.find(user => user.email === action.payload.email)) {
          state.users.push(action.payload);
        } else {
          console.log(`A user with email ${action.payload.email} already exists`);
        }
      },
      deleteUser: (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      },
      updateUser: (state, action) => {
        const { id, updatedFields } = action.payload;
        const userIndex = state.users.findIndex(user => user._id === id);
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            ...updatedFields,
          };
        }
      },
      updateGroupIDs: (state, action) => {
        const { groupID, memberIDs } = action.payload;
        const membersSet = new Set(memberIDs) 
        state.users.forEach(user => {
          if (membersSet.has(user._id)) {
            user.groupID = groupID;
          }
        });
      },
      setCurrentUserID: (state, action) => {
        state.currentUserID = action.payload;
      },
  },
});

export const { createUser, deleteUser, updateUser, setCurrentUserID, updateGroupIDs } = users.actions;
export default users.reducer;