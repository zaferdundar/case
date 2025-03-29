import {Link} from "react-router-dom";

const HeaderLogo = () => {
    return (
        <div className="header-logo">
            <div className="header-logo">
                <Link to="/">
                    <img
                        src="https://cdnhyper.s3.eu-central-1.amazonaws.com/hyper%20teknoloji%20logo%201_1685708957_1689886515.webp"
                        alt="Logo"
                    />
                </Link>
            </div>
        </div>
    )
}

export default HeaderLogo