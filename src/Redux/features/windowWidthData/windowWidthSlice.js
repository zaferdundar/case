import {createSlice} from '@reduxjs/toolkit';

export const windowWidthSlice = createSlice({
    name: 'windowWidthData',
    initialState: {
        windowWidthData: window.innerWidth,
    },
    reducers: {
        handleSetWindowWidthData: (state, action) => {
            state.windowWidthData = action.payload;
        },
    },
});

export const { handleSetWindowWidthData } = windowWidthSlice.actions;
export default windowWidthSlice.reducer;
