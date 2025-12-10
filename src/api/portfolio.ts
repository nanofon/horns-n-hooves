import { API_URL } from "../constants";

export type Portfolio = {
  ID: number;
  Name: string;
  Alias: string;
  ShortDescription: string;
  Description: string;
  RiskLevelID: number;
  IsActive: boolean;
};

type FetchResult = {
  portfolios: Portfolio[];
  benchmarks: Portfolio[];
};

export const getAllPortfolios = async (): Promise<FetchResult> => {
  // http://68.210.104.70:8082/api/v1/Portfolios

  const cachedPortfolios = sessionStorage.getItem("portfolios");
  const cachedBenchmarks = sessionStorage.getItem("benchmarks");

  if (cachedPortfolios && cachedBenchmarks) {
    return {
      portfolios: JSON.parse(cachedPortfolios),
      benchmarks: JSON.parse(cachedBenchmarks),
    };
  }

  const portfolios: Portfolio[] = [];
  const benchmarks: Portfolio[] = [];

  try {
    const response = await fetch(API_URL + "/api/v1/Portfolios");
    const data: Portfolio[] = await response.json();

    data.forEach((portfolio) => {
      if (portfolio.IsActive) {
        portfolios.push(portfolio);
      } else {
        benchmarks.push(portfolio);
      }
    });
  } catch (e) {
    console.log("Error fetching portfolios: ", e);
    return { portfolios: [], benchmarks: [] };
  }

  sessionStorage.setItem("portfolios", JSON.stringify(portfolios));
  sessionStorage.setItem("benchmarks", JSON.stringify(benchmarks));

  return { portfolios, benchmarks };
};
