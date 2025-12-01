import { DUMMY_PORTFOLIOS, DUMMY_RETURNS } from "./constants";

import { API_URL } from "./constants";

export const getPortfolios = async () => {
  // http://68.210.104.70:8082/api/v1/Portfolios

  try {
    const response = await fetch(API_URL + "/api/v1/Portfolios");
    const data = response.ok ? await response.json() : DUMMY_PORTFOLIOS;
    return data;
  } catch (e) {
    console.log(e);
    return DUMMY_PORTFOLIOS;
  }
};

export const getBacktest = async (PortfolioID, InitialDeposit, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest

  const body = {
    PortfolioID,
    InitialDeposit,
    DateStart: DateStart.toISOString(),
    DateEnd: new Date().toISOString(),
  };

  const response = await fetch(API_URL + "/api/v1/portfolios/backtest", {
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

  return result;
};

export const getPortfolio = async (alias) => {
  // http://68.210.104.70:8082/api/v1/Portfolios/byalias/sp500

  try {
    const response = await fetch(
      `${API_URL}/api/v1/Portfolios/byalias/${alias}`
    );
    const data = response.ok ? await response.json() : DUMMY_PORTFOLIOS;
    return data;
  } catch (e) {
    console.log(e);
    return DUMMY_PORTFOLIOS[0];
  }

};
