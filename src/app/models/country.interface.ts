export interface Country {
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: any;
  };
  capital: string[];
  region: string;
  subregion?: string;
  population: number;
  tld?: string[];
  currencies?: any;
  languages?: any;
  borders?: string[];
}