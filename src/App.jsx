import './App.css'
import "../src/assets/globalCss/global.css"
import {Route, Routes, useLocation} from "react-router-dom";
import getRoutes from './Routes/Routes.jsx'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {handleSetWindowWidthData} from "./Redux/features/windowWidthData/windowWidthSlice.js";
import "./i18n/i18n.js"
import {getMyBasketData} from "./Redux/features/basketData/basketDataSlice.js";
import LoadingCircle from "./Components/LoadingCircle/LoadingCircle.jsx";

function App() {
    const routes = getRoutes();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeCurrency = () => {
            const preferredCurrency = localStorage.getItem("preferredCurrency");
            if (!preferredCurrency) {
                localStorage.setItem("preferredCurrency", "TL");
            }
            setIsInitialized(true);
        };
        dispatch(getMyBasketData())

        initializeCurrency();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            dispatch(handleSetWindowWidthData(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <LoadingCircle />
        );
    }

    return (
        <Routes location={location} key={location.pathname}>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    )
}

export default App
