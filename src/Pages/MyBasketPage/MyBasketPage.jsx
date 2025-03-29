import Header from "../../Components/HeaderSection/Header/Header.jsx";
import basketDataSelector from "../../Hooks/basketDataSelector.js";
import Tilt from "react-parallax-tilt";
import {currencyCalculator} from "../../Components/currencyCalculator.js";
import "./myBasketPage.css"
import GlobalContainer from "../../GlobalContainer/GlobalContainer.jsx";
import {
    addItemToMyBasket,
    getMyBasketData,
    removeItemToMyBasket
} from "../../Redux/features/basketData/basketDataSlice.js";
import {useDispatch} from "react-redux";
import Footer from "../../Components/Footer/Footer.jsx";
import {useTranslation} from "react-i18next";

const MyBasketPage = () => {
    const dispatch = useDispatch()
    const {basketData} = basketDataSelector()
    const preferredCurrency = localStorage.getItem("preferredCurrency")
    const {t} = useTranslation();

    const addItem = (product) => {
        dispatch(addItemToMyBasket(product))
        dispatch(getMyBasketData())
    }

    const removeItem = (product) => {
        dispatch(removeItemToMyBasket(product))
        dispatch(getMyBasketData())
    }

    return (
        <div>
            <Header/>
            <div className="basket-container">
                <GlobalContainer>
                    <div className="basket-container-holder">
                        <div className="basket-items">
                            {
                                basketData.map((product, index) => {
                                    return (
                                        <div key={index} className="basket-item">
                                            <div className="basket-item-left">
                                                <div className="basket-item-image">
                                                    <img src={product.productData.productMainImage} alt=""/>
                                                </div>
                                            </div>
                                            <div className="basket-item-mid">
                                                <div className="basket-item-name">
                                                    <span>{product.productName}</span>
                                                </div>
                                                <div className="basket-item-info">
                                                    <span>{product.productData.productInfo}</span>
                                                </div>
                                                <div className="basket-item-price">
                                                    <span>{currencyCalculator(product.buyPrice, preferredCurrency)} {preferredCurrency}</span>
                                                </div>
                                            </div>
                                            <div className="basket-item-right">
                                                <div className="product-item-add-basket-btn">
                                                    <button
                                                        onClick={() => removeItem(product)}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        onClick={() => addItem(product)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="order-info">
                            <span>{t("total_order_quantity")} : {basketData.length}</span>
                            <span>
                                {(t("total_order_amount"))} : {currencyCalculator(basketData.reduce((acc, item) => acc + (item.buyPrice || 0),0))} {preferredCurrency}
                            </span>
                            <button>
                                {(t("proceed_to_payment"))}
                            </button>
                        </div>
                    </div>
                        <div style={{margin: "50px 0 50px 0", borderBottom: "1px solid gray"}}>
                    </div>
                </GlobalContainer>
            </div>
            <GlobalContainer>
                <Footer />
            </GlobalContainer>

        </div>
    )
}

export default MyBasketPage;