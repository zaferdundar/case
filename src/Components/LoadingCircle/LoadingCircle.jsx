import "./loadingCircle.css"

const LoadingCircle = ({searchLoading}) => {
    return (
        <div className="lds-container" style={{
            height: searchLoading ? "100%" : "100vh",
        }}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingCircle