export const currencyCalculator = (param) => {
    const preferredCurrency = localStorage.getItem("preferredCurrency")
    const USD = 32
    if (preferredCurrency === "USD") {
        return (param / USD).toFixed(2)
    }
    return param
}