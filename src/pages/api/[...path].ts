const BACKEND_URL = "http://68.210.104.70:8082";

export const prerender = false;

export async function GET({ request, params }) {
  const [PortfolioID, InitialDeposit, DateStart] = request.url
    .split("/api/")[1]
    .split("/");

  const body = {
    PortfolioID,
    InitialDeposit,
    DateStart,
    DateEnd: new Date().toISOString(),
  };

  const backendResponse = await fetch(
    BACKEND_URL + "/api/v1/portfolios/backtest",
    {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return backendResponse;
}