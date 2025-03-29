import {HiMagnifyingGlass} from "react-icons/hi2";
import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import {api} from "../../../axios/api.js";
import {currencyCalculator} from "../../currencyCalculator.js";
import {useNavigate} from "react-router-dom";
import LoadingCircle from "../../LoadingCircle/LoadingCircle.jsx";

const HeaderSearchArea = () => {
    const {t} = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const [dropDownMenuIsVisible, setDropDownMenuIsVisible] = useState(false);
    const [dropDownMenuData, setDropDownMenuData] = useState({});
    const [loading, setLoading] = useState(false);
    const ddMenuRef = useRef(null)
    const preferredCurrency = localStorage.getItem("preferredCurrency")
    const nav = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ddMenuRef.current && !ddMenuRef.current.contains(event.target)) {
                setDropDownMenuIsVisible(false)
                setLoading(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const search = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.split("").length >= 2) {
            getProducts(e.target.value)
        } else {
            setDropDownMenuIsVisible(false);
            setDropDownMenuData([])
        }
    }

    const getProducts = async (value) => {
        setLoading(true)
        await api()
            .post("Products/List", {
                page: 1,
                pageSize: 12,
                productCategoryID: 0
            })
            .then((data) => {
                const filteredData = data.data.data
                    .filter((product) => product.productName.toLowerCase().includes(value.toLowerCase()))
                    .slice(0, 5);
                setDropDownMenuData(filteredData);
                setLoading(false)
                setDropDownMenuIsVisible(true)
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    const goToProductDetail = (product) => {
        nav("/urun-detay", {state: {productDetail: product}});
    }

    return (
        <div className="header-search-area" ref={ddMenuRef}>
            <div className="header-search-input">
                <input
                    value={inputValue}
                    onChange={(e) => search(e)}
                    type="text"
                    placeholder={t("searchBoxPlaceHolder")}/>
            </div>
            <div className="header-search-btn">
                <button type="button">
                    <HiMagnifyingGlass/>
                </button>
            </div>
            {
                dropDownMenuIsVisible &&
                <div className="header-search-drop-down-menu">
                    <div className="dd-items">
                        {
                            loading ?
                                <LoadingCircle searchLoading={loading} /> :
                                dropDownMenuData.length > 0 ?
                                    dropDownMenuData.map((item, index) => {
                                        return (
                                            <div key={index} className="dd-item"
                                                 onClick={() => goToProductDetail(item)}>
                                                <div className="dd-item-left">
                                                    <div className="dd-image">
                                                        <img src={item.productData.productMainImage} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="dd-item-mid">
                                                    <div className="dd-item-name">
                                                        <span>{item.productName}</span>
                                                    </div>
                                                    <div className="dd-item-info">
                                                        <span>{item.productData.productInfo}</span>
                                                    </div>
                                                </div>
                                                <div className="dd-item-right">
                                                    <div className="dd-item-price">
                                                        <span>{currencyCalculator(item.buyPrice)} {preferredCurrency}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : <div className="dd-attention">
                                        <span>{t("no_result")}</span>
                                    </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default HeaderSearchArea