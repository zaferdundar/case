import {Link, useLocation, useNavigate} from "react-router-dom";
import "./header.css"
import {FaCaretDown, FaDiscord, FaEyeSlash, FaInstagram, FaMoon, FaPlus, FaYoutube} from "react-icons/fa";
import {FaBasketShopping, FaXTwitter} from "react-icons/fa6";
import GlobalContainer from "../../../GlobalContainer/GlobalContainer.jsx";
import {BsSun} from "react-icons/bs";
import {HiMagnifyingGlass} from "react-icons/hi2";
import {useSelector} from "react-redux";
import MobileHeader from "../MobileHeader/MobileHeader.jsx";
import HeaderLogo from "../HeaderLogo/HeaderLogo.jsx";
import HeaderSearchArea from "../HeaderSearchArea/HeaderSearchArea.jsx";
import {currencies, langs, menuList, routesLinkList, routesSocialMediaList} from "../../list.js";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import basketDataSelector from "../../../Hooks/basketDataSelector.js";

const Header = () => {
    const location = useLocation();
    const nav = useNavigate();
    const windowWidthData = useSelector((state) => state.windowWidthData.windowWidthData);
    const preferencesMenuRef = useRef(null);
    const [preferencesMenuIsOpen, setPreferencesMenuIsOpen] = useState(false)
    const preferredCurrency = localStorage.getItem("preferredCurrency")
    const [lang, setLang] = useState(localStorage.getItem("i18nextLng") || "");
    const [currency, setCurrency] = useState(localStorage.getItem("preferredCurrency") || "");
    const {t, i18n} = useTranslation();
    const {basketData} = basketDataSelector()

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (preferencesMenuRef.current && !preferencesMenuRef.current.contains(event.target)) {
                setPreferencesMenuIsOpen(false);
                setLang("")
                setCurrency("")
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const goToPage = (path) => {
        nav(path);
    }

    const openPreferencesMenu = () => {
        setPreferencesMenuIsOpen(!preferencesMenuIsOpen);
        setLang(localStorage.getItem("i18nextLng") || "");
        setCurrency(localStorage.getItem("preferredCurrency") || "");
    }

    const savePreferences = () => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
        if (currency) {
            localStorage.setItem("preferredCurrency", currency);
        }
        setPreferencesMenuIsOpen(false);
        window.location.reload()
    }

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <div className="header-container">
            <GlobalContainer>
                {
                    windowWidthData >= 710 ?
                        <div className="header-holder">
                            <div className="header-top">
                                <div className="header-top-left">
                                    <div className="header-top-links">
                                        {routesLinkList
                                            .map((route) => (
                                                <div
                                                    key={route.path}
                                                    className="header-top-item"
                                                    onClick={() => goToPage(route.path)}
                                                >
                                                    <div className="header-top-item-name">
                                                <span
                                                    className={`${location.pathname === route.path ? 'header-top-link-active' : ''}`}>
                                                    {t(route.name)}
                                                </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="header-top-right">
                                    <div className="header-top-socials">
                                        {routesSocialMediaList.map((route) => (
                                            <div key={route.path} className="header-top-item">
                                                <div className="header-top-item-icon">
                                                    <a href={route.path} target="_blank">
                                                        <span>
                                                            {React.createElement(route.icon)}
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/*{*/}
                                    {/*    authenticate &&*/}
                                    {/*    <div className="header-top-balance-data">*/}
                                    {/*        <div className="header-top-balance">*/}
                                    {/*            <div className="header-add-balance">*/}
                                    {/*                <button type="button">*/}
                                    {/*                    <FaPlus/>*/}
                                    {/*                </button>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="header-balance">*/}
                                    {/*                <span>50000 TL</span>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="header-hide-balance">*/}
                                    {/*                <button type="button">*/}
                                    {/*                    <FaEyeSlash/>*/}
                                    {/*                </button>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*}*/}
                                    <div className="header-top-preferences"
                                         ref={preferencesMenuRef}
                                    >
                                        <button onClick={() => openPreferencesMenu()}>
                                            <div className="header-top-preferences-flag">
                                                <img alt="Flag"
                                                     src="https://assets.hyperteknoloji.com/images/flags/tr.webp"/>
                                            </div>
                                            <div className="header-top-preferences-lang">
                                            <span>
                                                {t("selectedLanguage")} / {preferredCurrency}
                                            </span>
                                                <span>
                                                <FaCaretDown/>
                                            </span>
                                            </div>
                                        </button>
                                        {
                                            preferencesMenuIsOpen &&
                                            <div className="preferences-menu-container">
                                                <div className="preferences-menu-item">
                                                    <div className="preferences-menu-title">
                                                        <span>{t("selectedLanguage")}</span>
                                                    </div>
                                                    <div>
                                                        <select
                                                            value={lang}
                                                            onChange={(e) => setLang(e.target.value)}
                                                        >
                                                            {langs.map((item) => (
                                                                <option
                                                                    key={item.value}
                                                                    value={item.value}
                                                                >
                                                                    {t(item.lang)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="preferences-menu-item">
                                                    <div className="preferences-menu-title">
                                                        <span>{t("language")}</span>
                                                    </div>
                                                    <div>
                                                        <select
                                                            value={currency}
                                                            onChange={(e) => setCurrency(e.target.value)}
                                                        >
                                                            {currencies.map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="preferences-menu-item">
                                                    <div className="preferences-menu-save-btn">
                                                        <button
                                                            onClick={savePreferences}
                                                            disabled={!lang && !currency}
                                                        >
                                                            {t("save")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="header-top-switch-theme"
                                         onClick={toggleTheme}>
                                        <div className={`${theme === 'light' ? 'header-top-theme-item-active' : ''}`}>
                                            <BsSun size={12} color="#FFF"/>
                                        </div>
                                        <div className={`${theme === 'dark' ? 'header-top-theme-item-active' : ''}`}>
                                            <FaMoon size={12} color="#FFF"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-bottom">
                                <div className="header-bottom-left">
                                    <HeaderLogo/>
                                    <HeaderSearchArea/>
                                </div>
                                <div className="header-bottom-right">
                                    <div className="header-bottom-log-in">
                                    <span>
                                         {t("sign_in")}
                                    </span>
                                    </div>
                                    <div className="header-bottom-basket">
                                        <div className="header-bottom-basket-btn">
                                            <Link to="/siparislerim">
                                                <FaBasketShopping/>
                                            </Link>
                                        </div>
                                        <div className="header-bottom-basket-count">
                                            <span>{basketData.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-bottom-menu">
                                <div className="header-bottom-menu-items">
                                    {
                                        menuList.map((menu, index) => {
                                            return (
                                                <div key={index} className="header-bottom-menu-item">
                                                    <span>{t(menu.name).toUpperCase()}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <MobileHeader/>
                }
            </GlobalContainer>
        </div>
    )
}
export default Header