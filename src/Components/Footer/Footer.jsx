import "./footer.css"
import {footerList} from "../list.js";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();

    return (
        <div className="footer-container">
            <div className="footer-holder">
                <div className="footer-items">
                    {
                        footerList.map((item, index) => {
                            return (
                                <div key={index} className="footer-item">
                                    <div className="footer-item-title">
                                        <span>{t(item.footer_list_title)}</span>
                                    </div>
                                    {
                                        item.footer_list_subtitle.map((inner_item, index) => {
                                            return (
                                                item.footer_list_title === "contact_us" ?
                                                    <div key={index} className="footer-item-subtitle">
                                                        <span>{t(inner_item.footer_list_subtitle_name)}</span>
                                                    </div>
                                                    :
                                                    <div className="footer-item-subtitle" key={index}>
                                                        <a href={inner_item.footer_list_subtitle_path}>
                                                            {
                                                                item.footer_list_title === "popular_list"
                                                                    ? t(`FOOTER_POPULAR_LIST.${inner_item.footer_list_subtitle_name}`)
                                                                    : item.footer_list_title === "best_sellers"
                                                                        ? t(`FOOTER_BEST_SELLERS.${inner_item.footer_list_subtitle_name}`)
                                                                        : t(inner_item.footer_list_subtitle_name)
                                                            }
                                                        </a>
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer