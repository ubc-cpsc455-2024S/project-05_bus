import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  users: [
      {
        id: 1,
        username: "panda123",
        displayName: "James Smith",
        email: "panda123@gmail.com",
        groupID: 1
      },
      {
        id: 2,
        username: "maggiebk",
        displayName: "Maggie Baker",
        email: "maggiebaker@yahoo.com",
        groupID: 1
      },
      {
        id: 3,
        username: "mary02",
        displayName: "Mary Brown",
        email: "mhbrown@yahoo.com",
        groupID: 1
      },
      {
        id: 4,
        username: "johnny",
        displayName: "John Parker",
        email: "jparker@gmail.com",
        groupID: 1
      }
  ],
  currentUser: {
    id: 1,
    username: "panda123",
    displayName: "James Smith",
    email: "panda123@gmail.com",
    groupID: 1
  },
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
      createUser: (state, action) => {
          const user = {
              id: uuidv4(),
              ...action.payload,
          }
          state.users.push(user);
      },
      deleteUser: (state, action) => {
          state.users = state.users.filter(user => user.id !== action.payload);
      },
      setCurrentUser: (state, action) => {
          state.currentUser = state.users.find(user => user.id === action.payload);
      }
  },
});

export const { createUser, deleteUser, setCurrentUser } = users.actions;
export default users.reducer;