import { API_URL, DUMMY_RETURNS } from "../../../constants";

export const getBacktest = async (PortfolioID, InitialDeposit, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest
  // Query astro's /api and proxy configured in astro.config.mjs will reroute it to backend

  const key = [
    PortfolioID,
    InitialDeposit,
    DateStart.toISOString().slice(0, 7),
  ].join(".");

  const cachedValue = window.sessionStorage.getItem(key);

  if (cachedValue) {
    const { ts, data, labels } = JSON.parse(cachedValue);
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

  let payload;

  try {
    const response = await fetch(
      API_URL + [PortfolioID, InitialDeposit, DateStart.toISOString()].join("/")
    );
    payload = response.ok ? await response.json() : {};
  } catch (e) {
    console.log(e);
    payload = DUMMY_RETURNS;
  }

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

  sessionStorage.setItem(
    key,
    JSON.stringify({ ...result, ts: new Date().toISOString().slice(0, 7) })
  );
  return result;
};
