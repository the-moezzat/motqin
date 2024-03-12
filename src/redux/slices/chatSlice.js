import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentConversation: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        }
    }
});

export const {setCurrentConversation} = chatSlice.actions
export default chatSlice.reducer