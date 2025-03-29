import {HiMagnifyingGlass} from "react-icons/hi2";
import {useTranslation} from "react-i18next";

const HeaderSearchArea = () => {
    const {t} = useTranslation();

    return (
        <div className="header-search-area">
            <div className="header-search-input">
                <input type="text" placeholder={t("searchBoxPlaceHolder")}/>
            </div>
            <div className="header-search-btn">
                <button type="button">
                    <HiMagnifyingGlass/>
                </button>
            </div>
        </div>
    )
}

export default HeaderSearchArea