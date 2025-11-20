export const COMPANY_NAME = "RS Asset Management";
export const DUMMY_PORTFOLIOS = [
  {
    ID: 1,
    Name: "S&P 500 Buy-n-Hold",
    Description: "Simple portfolio to buy and hold SP500 index",
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