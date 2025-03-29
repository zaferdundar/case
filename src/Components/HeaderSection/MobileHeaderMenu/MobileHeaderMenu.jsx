import {menuList, routesLinkList} from "../../list.js";
import React from "react";
import {IoIosClose} from "react-icons/io";
import "./mobileHeaderMenu.css"
import {useNavigate} from "react-router-dom";
import {FaCaretDown, FaMoon} from "react-icons/fa";
import {BsSun} from "react-icons/bs";
import {useTranslation} from "react-i18next";

const MobileHeaderMenu = ({closeMenu}) => {
    const nav = useNavigate();
    const {t} = useTranslation();

    const goToPage = (path) => {
        nav(path);
    }
    return (
        <div className="mobile-header-menu-container">
            <div className="mobile-header-menu-close-btn">
                <button type="button" onClick={closeMenu}>
                    <IoIosClose size={30} color="#FFF"/>
                </button>
            </div>
            <div className="mobile-header-menu-items">
                {routesLinkList
                    .map((route) => (
                        <div
                            key={route.path}
                            className="mobile-header-menu-item"
                            onClick={() => goToPage(route.path)}
                        >
                                    <span
                                        className={`${location.pathname === route.path ? 'header-top-link-active' : ''}`}
                                    >
                                        {t(route.name)}
                                    </span>
                        </div>
                    ))}
                {
                    menuList.map((menu, index) => {
                        return (
                            <div key={index} className="mobile-header-menu-item">
                                <span>{t(menu.name)}</span>
                            </div>
                        )
                    })
                }
                {
                    <div className="mobile-header-menu-item">
                        <div className="header-top-preferences">
                            <div className="header-top-preferences-flag">
                                <img alt="Flag"
                                     src="https://assets.hyperteknoloji.com/images/flags/tr.webp"/>
                            </div>
                            <div className="header-top-preferences-lang">
                                    <span>
                                        Türkçe / TL
                                    </span>
                                <span>
                                        <FaCaretDown/>
                                    </span>
                            </div>
                        </div>
                    </div>
                }
                {
                    <div className="mobile-header-menu-item" style={{
                        width: "80px"
                    }}>
                        <div className="header-top-switch-theme">
                            <div className="header-top-theme-item">
                                <BsSun size={12}/>
                            </div>
                            <div className="header-top-theme-item">
                                <FaMoon size={12}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default MobileHeaderMenu