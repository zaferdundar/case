import {configureStore} from '@reduxjs/toolkit';
import userDataReducer from '../features/userData/userDataSlice.js';
import windowWidthDataReducer from '../features/windowWidthData/windowWidthSlice.js';
import basketDataReducer from '../features/basketData/basketDataSlice.js';

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        windowWidthData: windowWidthDataReducer,
        basketData: basketDataReducer,
    },
});