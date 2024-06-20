import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  users: [
      {
        id: "1",
        username: "panda123",
        name: "James Smith",
        email: "panda123@gmail.com",
        groupID: 1
      },
      {
        id: "2",
        username: "maggiebk",
        name: "Maggie Baker",
        email: "maggiebaker@yahoo.com",
        groupID: 1
      },
      {
        id: "3",
        username: "mary02",
        name: "Mary Brown",
        email: "mhbrown@yahoo.com",
        groupID: 1
      },
      {
        id: "4",
        username: "johnny",
        name: "John Parker",
        email: "jparker@gmail.com",
        groupID: 1
      },
      {
        id: "5",
        username: "karenn",
        name: "Karen Nelson",
        email: "karennelson@gmail.com",
        groupID: null
      }
  ],
  currentUserID: "5"
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
      createUser: (state, action) => {
        const user = {
            id: nanoid(),
            ...action.payload,
        }
        state.users.push(user);
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