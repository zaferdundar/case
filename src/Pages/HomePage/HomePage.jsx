import {api} from "../../axios/api.js";
import React, {useEffect, useState} from "react";
import "./homePage.css"
import Header from "../../Components/HeaderSection/Header/Header.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {Autoplay, EffectCoverflow} from 'swiper/modules';
import GlobalContainer from "../../GlobalContainer/GlobalContainer.jsx";
import {FaBasketShopping} from "react-icons/fa6";
import Tilt from 'react-parallax-tilt';
import Footer from "../../Components/Footer/Footer.jsx";
import {currencyCalculator} from "../../Components/currencyCalculator.js";
import {useDispatch} from "react-redux";
import {
    addItemToMyBasket,
    getMyBasketData,
    removeItemToMyBasket
} from "../../Redux/features/basketData/basketDataSlice.js";
import {useNavigate} from "react-router-dom";
import LoadingCircle from "../../Components/LoadingCircle/LoadingCircle.jsx";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const preferredCurrency = localStorage.getItem("preferredCurrency")
    const dispatch = useDispatch();
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);

    const auth = async (param) => {
        setLoading(true)
        await api()
            .post("Products/List", {
                page: 1,
                pageSize: 12,
                productCategoryID: 0
            })
            .then((data) => {
                setProducts(data.data.data.slice(0, 50))
                setLoading(false)
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    useEffect(() => {
        auth()
    }, [])

    const addItem = (product) => {

        dispatch(addItemToMyBasket(product))
        dispatch(getMyBasketData())
    }

    const removeItem = (product) => {
        dispatch(removeItemToMyBasket(product))
        dispatch(getMyBasketData())
    }

    const goToProductDetail = (product) => {
        nav("/urun-detay", {state: {productDetail: product}});
    }

    return (
        loading ?
            <LoadingCircle/>
            :
            <div className="home-page-container">
                <Header/>
                <div style={{
                    border: "1px solid gray",
                    borderRadius: "10px"
                }}>
                </div>
                <div className="slider-container">
                    <div className="slider-holder">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            coverflowEffect={{
                                rotate: 10,
                                stretch: 100,
                                depth: 100,
                                modifier: 5,
                                slideShadows: true,
                            }}
                            pagination={true}
                            modules={[Autoplay, EffectCoverflow]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/docwaylay-slider_9176179504ef2c1fce938813ac7506d8.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/docrise-slider_b2ff1b0fa26de96bf1288d8c3d1b2c65.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/docknight-slider_3e7d5e08a34a317e5bd187cc48af24f9.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/doc55games-slider_1e42be9178d7b323f98563a312e2b929.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/docbarbarosa2-slider_ac17aa21cb6eea872b2a20a1fa3f2b31.jpg"/>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://assets.hyperteknoloji.com/cdn/sonteklif/slider/doccryrax-slider_4352405d93a1adbd613525540090535d.jpg"/>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="home-page-mid-side">
                    <GlobalContainer>
                        <div className="products">
                            <div className="product-items">
                                {
                                    products.map((product, index) => {
                                        return (
                                            <div key={index} className="product-item"
                                                 onClick={() => goToProductDetail(product)}>
                                                <Tilt>
                                                    <div className="product-item-left">
                                                        <div className="product-item-image">
                                                            <img src={product.productData.productMainImage} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="product-item-right">
                                                        <div className="product-item-right-top">
                                                            <div className="product-item-name">
                                                                <span>{product.productName}</span>
                                                            </div>
                                                            <div className="product-item-info">
                                                                <span>{product.productData.productInfo}</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-item-right-bottom">
                                                            <div className="product-item-price">
                                                                <span>{currencyCalculator(product.buyPrice)} {preferredCurrency}</span>
                                                            </div>
                                                            <div className="product-item-add-basket-btn">
                                                                <button onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeItem(product)
                                                                }}>
                                                                    -
                                                                </button>
                                                                <div>
                                                                    <FaBasketShopping size={25}/>
                                                                </div>
                                                                <button onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    addItem(product)
                                                                }}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tilt>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </GlobalContainer>
                </div>
                <div style={{
                    border: "1px solid gray",
                    borderRadius: "10px"
                }}>
                </div>
                <div className="footer-side">
                    <GlobalContainer>
                        <Footer/>
                    </GlobalContainer>
                </div>
            </div>
    )
}

export default HomePage