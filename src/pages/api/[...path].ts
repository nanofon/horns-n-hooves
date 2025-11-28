const BACKEND_URL = "http://68.210.104.70:8082";
import { DUMMY_RETURNS } from "../../constants.js";

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

  return new Response("", {
    status: 200,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  /*
  const targetUrl = `https://external-host.com/${params.path.join("/")}`;

  const res = await fetch(targetUrl, {
    method: "POST",               // 👈 Transform here
    headers: {
      "content-type": "application/json",
      ...Object.fromEntries(request.headers),
    },
    body: JSON.stringify({}),     // optional
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: res.headers,
  });
  */
}
