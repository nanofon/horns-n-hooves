import { API_URL } from "../../../constants";

export const getBacktest = async (PortfolioID, InitialDeposit, MonthlyContribution, DateStart) => {
  // http://68.210.104.70:8082/api/v1/portfolios/backtest

  const key = [
    PortfolioID,
    InitialDeposit,
    MonthlyContribution,
    DateStart.toISOString().slice(0,7),
  ].join(".");
  const cachedValue = sessionStorage.getItem(key);

  if (cachedValue) {
    return await JSON.parse(cachedValue);
  }
  
  const body = {
    PortfolioID,
    InitialDeposit,
    MonthlyContribution,
    DateStart: DateStart.toISOString(),
    DateEnd: new Date().toISOString(),
    CashflowValue: MonthlyContribution, // Assuming logic implies this mapping based on MonthlyContribution presence
    CashflowFrequency: "Monthly",
    CashflowDirection: "Contribute", // Usually 'Deposit' for contribution? Original was 'None'. Need to check logic.
    CashflowType: "Fixed" // Original was 'None'. Check assumptions.
  };
    
  const response = await fetch(API_URL + "/api/v1/portfolios/backtest", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  
  const payload = await response.json();

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