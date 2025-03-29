import {createSlice} from '@reduxjs/toolkit';

export const basketDataSlice = createSlice({
    name: 'basketData',
    initialState: {
        myBasketData: []
    },
    reducers: {
        getMyBasketData: (state) => {
            state.myBasketData = JSON.parse(localStorage.getItem("myBasketItems")) || [];
        },
        addItemToMyBasket: (state, action) => {
            const existingBasket = JSON.parse(localStorage.getItem("myBasketItems")) || [];
            const newBasketItems = [...existingBasket, action.payload];
            localStorage.setItem("myBasketItems", JSON.stringify(newBasketItems));
        },
        removeItemToMyBasket: (state, action) => {
            const existingBasket = JSON.parse(localStorage.getItem("myBasketItems")) || [];

            const itemIndex = existingBasket.findIndex(item => item.productID === action.payload.productID);
            if (itemIndex !== -1) {
                existingBasket.splice(itemIndex, 1);
            }
            localStorage.setItem("myBasketItems", JSON.stringify(existingBasket));
        }
    },
});

export const { addItemToMyBasket, getMyBasketData, removeItemToMyBasket } = basketDataSlice.actions;
export default basketDataSlice.reducer;
