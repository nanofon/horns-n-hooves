import { API_URL } from "../constants";

export type BacktestInputs = {
  InitialDeposit: number;
  MonthlyContribution: number;
  DateStart: Date;
};

type FetchResult = {
  data: number[];
  labels: string[];
  cagr: number;
  maxDrawdown: number;
};

export const getBacktest = async (
  PortfolioID: number,
  backtestInputs: BacktestInputs
): Promise<FetchResult> => {
  // POST http://68.210.104.70:8082/api/v1/portfolios/backtest

  const { InitialDeposit, MonthlyContribution, DateStart } = backtestInputs;

  const key = [
    PortfolioID,
    DateStart.toISOString().slice(0, 7),
    InitialDeposit.toFixed(0),
    MonthlyContribution.toFixed(0),
  ].join(".");

  const cachedBacktest = sessionStorage.getItem(key);

  if (cachedBacktest) {
    return JSON.parse(cachedBacktest);
  }

  const body = {
    PortfolioID,
    InitialDeposit,
    DateStart: DateStart.toISOString(),
    DateEnd: new Date().toISOString(),
    CashflowValue: MonthlyContribution,
    CashflowFrequency: "Monthly",
    CashflowDirection: "Contribute",
    CashflowType: "Fixed",
  };

  try {
    const response = await fetch(API_URL + "/api/v1/portfolios/backtest", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    sessionStorage.setItem(key, JSON.stringify(data));

    return data;
  } catch (e) {
    console.log("Error fetching backtest: ", e);
    return {
      data: [],
      labels: [],
      cagr: 0,
      maxDrawdown: 0,
    };
  }
};
