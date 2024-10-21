export interface Link {
    uid: string;
    owner: string;
    companyName: string;
    productName: string;
    country: string;
    active: boolean;
    refLink: string;
    seen: number;
    used: number;
  }
  
  export interface Company {
    idCompanies: number;
    companyName: string;
    productName: string;
    linkFormat: string;
    country: string;
  }

  export interface User {
    uid: string;
    name: string; 
  }
  