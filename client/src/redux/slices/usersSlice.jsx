import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
      {
        id: "1",
        firstName: "James",
        lastName: "Smith",
        email: "panda123@gmail.com",
        password: "password123",
        groupID: "1"
      },
      {
        id: "2",
        firstName: "Maggie",
        lastName: "Baker",
        email: "maggiebaker@yahoo.com",
        password: "password123",
        groupID: "1"
      },
      {
        id: "3",
        firstName: "Mary",
        lastName: "Brown",
        email: "mhbrown@yahoo.com",
        password: "password123",
        groupID: "1"
      },
      {
        id: "4",
        firstName: "John",
        lastName: "Parker",
        email: "jparker@gmail.com",
        password: "password123",
        groupID: null
      },
      {
        id: "5",
        firstName: "Karen",
        lastName: "Nelson",
        email: "karennelson@gmail.com",
        password: "password123",
        groupID: null
      },
      {
        id: "6",
        firstName: "Sam",
        lastName: "Cyrus",
        email: "scy456@gmail.com",
        password: "password123",
        groupID: null
      }
  ],
  currentUserID: "1"
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
        state.users = state.users.filter(user => user.id !== action.payload);
      },
      updateUser: (state, action) => {
        const { id, updatedFields } = action.payload;
        const userIndex = state.users.findIndex(user => user.id === id);
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
          if (membersSet.has(user.id)) {
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