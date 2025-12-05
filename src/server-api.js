import { API_URL } from "./constants";

export const getPortfolios = async () => {
  // http://68.210.104.70:8082/api/v1/Portfolios

  try {
    const response = await fetch(API_URL + "/api/v1/Portfolios");
    console.log(response);
    const data = response.ok ? await response.json() : [];
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getPortfolio = async (alias) => {
  // http://68.210.104.70:8082/api/v1/Portfolios/byalias/sp500

  try {
    const response = await fetch(
      `${API_URL}/api/v1/Portfolios/byalias/${alias}`
    );
    const data = response.ok ? await response.json() : {};
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }

};
