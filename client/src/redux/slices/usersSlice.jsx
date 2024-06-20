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
  currentUser: ""
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
      setCurrentUser: (state, action) => {
          state.currentUser = state.users.find(user => user.id === action.payload);
      }
  },
});

export const { createUser, deleteUser, setCurrentUser } = users.actions;
export default users.reducer;