import {createSlice} from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: null,
        preferredLanguage: ""
    },
    reducers: {
        handleSetPreferredLanguage: (state) => {
            state.preferredLanguage = localStorage.getItem('preferredLanguage')
        },
    },
});

export const { handleSetPreferredLanguage } = userDataSlice.actions;
export default userDataSlice.reducer;
