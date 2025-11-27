import { DUMMY_RETURNS } from "./constants";

const BACKEND_URL = "http://68.210.104.70:8082";

export const getBacktest = async (PortfolioID, InitialDeposit, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest

  const key = [
    PortfolioID,
    InitialDeposit,
    DateStart.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
  ].join(".");

  const cache = window.sessionStorage.getItem(key);

  if (cache) {
    const { ts, data, labels } = JSON.parse(cache);
    if (new Date() - new Date(ts) < 3600000) {
      return { data, labels };
    }
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

  sessionStorage.setItem(key, JSON.stringify({ ...result, ts: new Date() }));
  return result;
};
