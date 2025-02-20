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
    created: Date;
    updated: Date;
  }
  
  export interface Company {
    idCompanies: number;
    companyName: string;
    productName: string;
    linkFormat: string;
    country: string;
    approval: string;
  }

  export interface User {
    uid: string;
    name: string; 
    email: string;
    photoURL: string;
  }
  
  export interface Report {
    reporterUid: string;
    linkId: string;
    reportType: string;
    timestamp?: Date;
    
  }

  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: Error | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
  }