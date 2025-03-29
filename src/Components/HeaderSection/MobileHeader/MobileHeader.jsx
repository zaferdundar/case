import HeaderLogo from "../HeaderLogo/HeaderLogo.jsx";
import HeaderSearchArea from "../HeaderSearchArea/HeaderSearchArea.jsx";
import "./mobileHeader.css"
import {RxHamburgerMenu} from "react-icons/rx";
import {CiLogin} from "react-icons/ci";
import "./mobileHeader.css"
import Modal from 'react-modal';
import React, {useState} from "react";
import 'animate.css';
import MobileHeaderMenu from "../MobileHeaderMenu/MobileHeaderMenu.jsx";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
        top: '0',
        left: '0',
        width: '70vw',
        height: '100vh',
        padding: '20px',
        borderRadius: '0',
        border: 'none',
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'var(--primary-header-background-color)',
        outline: 'none',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
    },
};


const MobileHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setOpenMenu(false);
        }, 900);
    };

    const mobileMenu = () => {
        return (
            <Modal
                isOpen={openMenu}
                onRequestClose={handleCloseMenu}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                className={`${!isClosing ? "animate__animated animate__fadeInLeft" : "animate__animated animate__fadeOutLeft"}`}
            >
                <div className="before-invite-modal-container">
                    <MobileHeaderMenu closeMenu={handleCloseMenu}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
            <div className="header-mobile-container">
                <div className="header-mobile-holder">
                    <div className="header-mobile-top">
                        <div className="header-mobile-menu-icon" onClick={() => setOpenMenu(true)}>
                            <RxHamburgerMenu size={30}/>
                        </div>
                        <HeaderLogo/>
                        <div className="header-mobile-login-icon">
                            <CiLogin size={30}/>
                        </div>
                    </div>
                    <HeaderSearchArea/>
                </div>
            </div>
            {mobileMenu()}
        </>
    )
}

export default MobileHeader