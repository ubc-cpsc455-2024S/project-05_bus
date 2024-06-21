import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [
        { id: "0", firstName: 'John', lastName: 'Doe', email: 'johndoe@email.com', password: '123Password!' },
        { id: "1", firstName: 'Jane', lastName: 'Doe', email: 'janedoe@email.com', password: '123Password!' },
    ],
    selectedMember: "",
}

initialState.id = initialState.members.length;

const members = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action) => {
            const member = {
                id: state.id++,
                ...action.payload,
            }
            state.members.push(member);
        },
        removeMember: (state, action) => {
            state.members = state.members.filter((member) => member.id !== action.payload);
        },
        setSelectedMember: (state, action) => {
            state.selectedMember = state.members.find((member) => member.id === action.payload);
        }
    },
});

export const { addMember, removeMember, setSelectedMember } = members.actions;
export default members.reducer;