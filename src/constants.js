export const COMPANY_NAME = "RS Asset Management";
export const HERO_TEXT_FULL = `Our investment philosophy is built on a singular principle: <strong
            >maximize returns per unit of risk</strong
            >. We believe that consistent alpha generation stems not from taking
            more risk, but from taking the <em>right</em> risks at the
            <em>right</em> time. Through rigorous quantitative analysis and continuous
            research, we identify market inefficiencies and deploy capital where
            the risk-reward profile is most favorable.`;
export const HERO_TEXT_SHORT = `Our philosophy is built around <strong>maximizing returns</strong> per unit of risk in a <em>reliable way</em>.
            <br>Check our portfolios`;
export const PILLARS = [
  {
    title: "Global Macro",
    description:
      "Top-down analysis of economic trends, policy shifts, and geopolitical developments across currencies, rates, commodities, and equities.",
  },
  {
    title: "Managed Futures",
    description:
      "Systematic trend-following and mean-reversion strategies across diversified futures markets, providing low correlation to traditional assets.",
  },
  {
    title: "Factor Investment",
    description:
      "Disciplined exposure to proven risk premia including value, momentum, quality, and carry, dynamically weighted based on market conditions.",
  },
];

export const DUMMY_PORTFOLIOS = [
  {
    ID: 1,
    Name: "S&P 500 Buy-n-Hold",
    Alias: "sp500",
    ShortDescription: "Simple portfolio to buy and hold SP500 index",
    Description: "(Long desc) Simple portfolio to buy and hold SP500 index",
    RiskLevelID: 3,
    IsActive: true,
    IsDeleted: false,
    IsPaper: true,
    links: [
      { href: "/api/v1/Portfolios/1", rel: "self", method: "GET" },
      {
        href: "/api/v1/Portfolios/1",
        rel: "delete_portfolio",
        method: "DELETE",
      },
      { href: "/api/v1/Portfolios", rel: "insert_portfolio", method: "POST" },
      { href: "/api/v1/Portfolios", rel: "update_portfolio", method: "PUT" },
    ],
  },
  {
    ID: 2,
    Name: "Stocks-Bonds 60/40",
    Alias: "stocksbonds6040",
    ShortDescription: "Portfolio of 60% SP500 stocks and 40% long-term bonds",
    Description:
      "(Long desc) Portfolio of 60% SP500 stocks and 40% long-term bonds",
    RiskLevelID: 2,
    IsActive: true,
    IsDeleted: false,
    IsPaper: true,
    links: [
      { href: "/api/v1/Portfolios/2", rel: "self", method: "GET" },
      {
        href: "/api/v1/Portfolios/2",
        rel: "delete_portfolio",
        method: "DELETE",
      },
      { href: "/api/v1/Portfolios", rel: "insert_portfolio", method: "POST" },
      { href: "/api/v1/Portfolios", rel: "update_portfolio", method: "PUT" },
    ],
  },
  {
    ID: 3,
    Name: "Sample Portfolio 01",
    Alias: "sample01",
    ShortDescription: "Sample actively managed portfolio",
    Description: "(Long desc) Sample actively managed portfolio",
    RiskLevelID: 1,
    IsActive: false,
    IsDeleted: false,
    IsPaper: true,
    links: [
      { href: "/api/v1/Portfolios/3", rel: "self", method: "GET" },
      {
        href: "/api/v1/Portfolios/3",
        rel: "delete_portfolio",
        method: "DELETE",
      },
      { href: "/api/v1/Portfolios", rel: "insert_portfolio", method: "POST" },
      { href: "/api/v1/Portfolios", rel: "update_portfolio", method: "PUT" },
    ],
  },
  {
    ID: 4,
    Name: "Multifactor Quality Stocks + Market Regime",
    Alias: "multifactorquality",
    ShortDescription:
      "This portfolio invests into quality stocks selected based on multiple valuation and operational factors. It is also actively rotating portfolio holdings based on proprietary market regime indicator.",
    Description:
      "(Long desc) This portfolio invests into quality stocks selected based on multiple valuation and operational factors. It is also actively rotating portfolio holdings based on proprietary market regime indicator.",
    RiskLevelID: 2,
    IsActive: true,
    IsDeleted: false,
    IsPaper: true,
    links: [
      { href: "/api/v1/Portfolios/4", rel: "self", method: "GET" },
      {
        href: "/api/v1/Portfolios/4",
        rel: "delete_portfolio",
        method: "DELETE",
      },
      { href: "/api/v1/Portfolios", rel: "insert_portfolio", method: "POST" },
      { href: "/api/v1/Portfolios", rel: "update_portfolio", method: "PUT" },
    ],
  },
];

export const DUMMY_RETURNS = {
  "Values": {
    "2024-12-01T00:00:00": 1000000,
    "2025-01-01T00:00:00": 967300,
    "2025-02-01T00:00:00": 996319,
    "2025-03-01T00:00:00": 973702.5587,
    "2025-04-01T00:00:00": 929399.09227915,
    "2025-05-01T00:00:00": 936834.2850173832,
    "2025-06-01T00:00:00": 987048.6026943149,
    "2025-07-01T00:00:00": 1033538.5918812172,
    "2025-08-01T00:00:00": 1039326.407995752,
    "2025-09-01T00:00:00": 1067076.4230892386,
    "2025-10-01T00:00:00": 1122030.8588783343,
    "2025-11-01T00:00:00": 1145930.116172443
  },
  "CAGR": 0.160628252796005,
  "MaxDrawdown": -0.07060090772085
};
