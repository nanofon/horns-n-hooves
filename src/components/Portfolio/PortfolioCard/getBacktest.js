const BACKEND_URL = "http://68.210.104.70:8082";
import { DUMMY_RETURNS } from "../../../constants";

export const getBacktest = async (PortfolioID, InitialDeposit, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest

  const key = [
    PortfolioID,
    InitialDeposit,
    DateStart.toISOString().slice(0,7),
  ].join(".");
  const cachedValue = sessionStorage.getItem(key);

  if (cachedValue) {
    return await JSON.parse(cachedValue);
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
  
  const payload = response.ok ? await response.json() : DUMMY_RETURNS;

  const result = {
    data: Object.values(payload.Values).map((value) =>
      value > 0.5 ? Math.round(value) : value
    ),
    labels: Object.keys(payload.Values).map((date) =>
      new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    ),
  };

  sessionStorage.setItem(key, JSON.stringify(result));
  return result;
};