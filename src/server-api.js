import NodeCache from "node-cache";
import { DUMMY_PORTFOLIOS, DUMMY_RETURNS } from "./constants";

const BACKEND_URL = "http://68.210.104.70:8082";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 });

export const getPortfolios = async () => {
  // http://68.210.104.70:8082/api/v1/Portfolios

  const key = "pflist";
  const cachedValue = cache.get(key);

  if (!cachedValue) {
    const response = await fetch(BACKEND_URL + "/api/v1/Portfolios");
    const data = response.ok ? await response.json() : DUMMY_PORTFOLIOS;
    cache.set(key, data);
    return data;
  }

  return cachedValue;
};

export const getBacktest = async (PortfolioID, InitialDeposit, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest

  const key = [
    PortfolioID,
    InitialDeposit,
    DateStart.toLocaleDateString("en-US", { year: "numeric", month: "short" }),
  ].join(".");
  const cachedValue = cache.get(key);

  if (cachedValue) {
    return cachedValue;
  }
  
  const body = {
    PortfolioID,
    InitialDeposit,
    DateStart: DateStart.toISOString(),
    DateEnd: new Date().toISOString(),
  };
    
  const response = await fetch(BACKEND_URL + "/api/v1/portfolios/backtest", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  const data = response.ok ? await response.json() : DUMMY_RETURNS;
  
  const result = {
    data: Object.values(data.Values).map((value) =>
      value > 0.5 ? Math.round(value) : value
    ),
    labels: Object.keys(data.Values).map((date) =>
      new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    ),
  };

  cache.set(key, result);
  return result;
};

export const getPortfolio = async (alias) => {
  // http://68.210.104.70:8082/api/v1/Portfolios/byalias/sp500

  const key = "alias" + alias;
  const cachedValue = cache.get(key);

  if (!cachedValue) {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/Portfolios/byalias/${alias}`
    );
    const data = response.ok ? await response.json() : DUMMY_PORTFOLIOS;
    cache.set(key, data);
    return data;
  }

  return cachedValue;
};
