import HomePage from "../Pages/HomePage/HomePage.jsx"
import {Navigate} from "react-router-dom";
import MyBasketPage from "../Pages/MyBasketPage/MyBasketPage.jsx";
import ProductDetail from "../Pages/ProductDetail/ProductDetail.jsx";

const Routes = () => {
    return [
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/siparislerim',
            element: <MyBasketPage/>
        },
        {
            path: '/urun-detay',
            element: <ProductDetail/>
        },
        {
            path: '*',
            element: <Navigate to={"/"} />
        },
    ];
};

export default Routes;