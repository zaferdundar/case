import "./globalContainer.css"

const GlobalContainer = ({children}) => {
    return (
        <div className="global-container">
            <div className="global-container-holder">
                {children}
            </div>
        </div>
    )
}

export default GlobalContainer;