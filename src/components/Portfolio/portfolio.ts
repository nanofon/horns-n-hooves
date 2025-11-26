type link = {
  href: string;
  rel: string;
  method: string;
};

export type portfolio = {
    ID: number;
    Name: string;
    Alias: string;
    ShortDescription: string;
    Description: string;
    RiskLevelID: number;
    IsActive: boolean;
    IsDeleted: boolean;
    IsPaper: boolean;
    links: link[];
};