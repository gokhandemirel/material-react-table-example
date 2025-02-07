export interface Country {
  name?: string;
  unicode?: string;
  emoji?: string;
  code?: string;
  dialCode?: string;
  alpha3?: string;
  region?: string;
  capital?: string;
  geo?: Geo;
  timezones?: string[];
}

export interface Geo {
  lat?: number;
  long?: number;
}
