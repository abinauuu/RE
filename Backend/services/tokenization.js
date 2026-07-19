const DEFAULT_TOKEN_SUPPLY = require("../constants")

const calculateTokenPrice = (propertyPrice)=>{return propertyPrice/DEFAULT_TOKEN_SUPPLY}
const calculateTokensPurchased = (investmentAmount,tokenPrice)=>{return investmentAmount/tokenPrice}
const calculateInvestment = (tokenOwned,currentTokenPrice)=>{return tokenOwned*currentTokenPrice}
const calculateProfit=(currentValue,investedAmount)=>{return currentValue-investedAmount}
const calculateOwnershipPercentage=(tokensOwned)=>{return (tokensOwned/DEFAULT_TOKEN_SUPPLY )*100}
const calculateAvailableSupply =(availableSupply,tokenPurchased)=>{return availableSupply-tokenPurchased}
const calculateMarketCap = (currentTokenPrice) => {
    return currentTokenPrice * TOKEN_SUPPLY;
};

module.exports={calculateTokenPrice,calculateTokensPurchased,calculateInvestment,calculateProfit,calculateOwnershipPercentage,calculateAvailableSupply,calculateMarketCap}