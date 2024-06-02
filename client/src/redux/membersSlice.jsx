import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [
        { id: 0, name: 'John Doe' },
        { id: 1, name: 'Jane Doe' },
    ],
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
    },
});

export const { addMember, removeMember } = members.actions;
export default members.reducer;