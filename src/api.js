const PORTFOLIO_LIST_CACHE_TTL_MINUTES = 5;
const PORTFOLIO_RETURNS_CACHE_TTL_MINUTES = 1;
const BACKEND_URL = "http://68.210.104.70:8082";
import { DUMMY_PORTFOLIOS, DUMMY_RETURNS } from "./constants";


const fetchPortfolios = async () => {
  const response = await fetch(BACKEND_URL + "/api/v1/Portfolios");
  if (!response.ok) {
    return DUMMY_PORTFOLIOS
    //throw new Error("Failed to fetch portfolios");
  }
  const data = await response.json();
  return data;
};

// This is a proper function with caching but want to avoid client-side rendering for now
const getPortfolios = async (localStorage) => {
  const localPortfolios = localStorage.getItem("portfolios");
  if (localPortfolios) {
    const { portfolio, lastUpdated } = JSON.parse(localPortfolios);
    if (
      new Date() - new Date(lastUpdated) <
      PORTFOLIO_LIST_CACHE_TTL_MINUTES * 60 * 1000
    ) {
      return portfolio;
    }
    const fetchedPortfolios = await fetchPortfolios();
    localStorage.setItem("portfolios", {
      portfolio: JSON.stringify(fetchedPortfolios),
      lastUpdated: new Date().toISOString(),
    });
  }
  return fetchedPortfolios;
};

const fetchReturns = async () => {
  const response = await fetch(BACKEND_URL + "/api/v1/PortfolioReturns/");
  if (!response.ok) {
    return 
    //throw new Error("Failed to fetch returns");
  }
  const data = await response.json();
  return data;
};

const fetchLTMReturns = async (ID) => {
  const body = {
    PortfolioID: parseInt(ID),
    InitialDeposit: 1000000,
    DateStart: new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    ).toISOString(),
    DateEnd: new Date().toISOString(),
  };
  const returns = await fetch(BACKEND_URL + "/api/v1/portfolios/backtest", {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!returns.ok) {
    return DUMMY_RETURNS;
    //throw new Error("Failed to fetch LTM returns");
  }
  const data = await returns.json();
  return data;
};

export { fetchPortfolios, fetchReturns, fetchLTMReturns };
