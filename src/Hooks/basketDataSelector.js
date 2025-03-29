import {useSelector} from "react-redux";

const basketDataSelector = () => {
    const basketData = useSelector((state) => state.basketData.myBasketData);

    return {basketData}
}

export default basketDataSelector;