import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { fakeFetchCripto, fetchAssets } from "../api";  
import {percentDifference} from "../utils";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
});

function mapAssets(assets, result) {
  return assets.map((i) => {
    const coin = result.find((c) => c.id === i.id);
    return{
      grow: coin.price > i.price,
      growPercent: percentDifference(i.price, coin.price),
      totalAmmount: i.amount * coin.price,
      totalProfit: i.amount * coin.price - i.amount * i.price,
      ...i,}
  });
}


export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [assets, setAssets] = useState([]);
    const [crypto, setCrypto] = useState([]);

 useEffect(() => {
    async function perload() {
      setLoading(true);
      const {result} = await fakeFetchCripto();
      const assets = await fetchAssets()
      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
  } perload()}, []);

  function addAsset(asset) {
    setAssets((prev) => mapAssets([...prev, asset], crypto));
  } 
    return (<CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>{children}</CryptoContext.Provider>)  
};
export default CryptoContext;
export function useCrypto() { return useContext(CryptoContext)};

