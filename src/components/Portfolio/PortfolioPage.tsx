import { useState, useEffect } from "preact/hooks";
import { Simulator } from "./Simulator";
import { PortfolioList } from "./List";

export const PortfolioPage = () => {
  const [alias, setAlias] = useState<string | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const alias = params.get("alias");
    setAlias(alias);
    setIsClientReady(true);
  }, []);

  if (!isClientReady) {
    return <div>Loading...</div>;
  }

  return alias ? <Simulator alias={alias} /> : <PortfolioList />;
};
