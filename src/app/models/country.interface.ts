export interface Country {
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
}