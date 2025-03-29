import {useLocation} from "react-router-dom";
import Header from "../../Components/HeaderSection/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import GlobalContainer from "../../GlobalContainer/GlobalContainer.jsx";
import {currencyCalculator} from "../../Components/currencyCalculator.js";
import "./productDetail.css"
import {
    addItemToMyBasket,
    getMyBasketData,
    removeItemToMyBasket
} from "../../Redux/features/basketData/basketDataSlice.js";
import {useDispatch} from "react-redux";

const ProductDetail = () => {
    const location = useLocation();
    const product = location.state?.productDetail;
    const dispatch = useDispatch();

    const preferredCurrency = localStorage.getItem("preferredCurrency")

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
            <div className="product-detail-container">
                <GlobalContainer>
                    <div className="product-detail-holder" style={{
                        margin: "20px 0"
                    }}>
                        <div className="product-detail-inner">
                            <div className="product-detail-left">
                                <div className="product-detail-img">
                                    <img src={product.productData.productMainImage}/>
                                </div>
                            </div>
                            <div className="product-detail-mid">
                                <div className="basket-item-mid">
                                    <div className="basket-item-name">
                                        <span>{product.productData.productName}</span>
                                    </div>
                                    <div className="basket-item-info">
                                        <span>{product.productData.productInfo}</span>
                                    </div>
                                    <div className="basket-item-price">
                                        <span>{currencyCalculator(product.buyPrice, preferredCurrency)} {preferredCurrency}</span>
                                    </div>
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
                        </div>
                    </div>
                </GlobalContainer>
            </div>
            <GlobalContainer>
                <Footer/>
            </GlobalContainer>
        </div>
    )
}

export default ProductDetail