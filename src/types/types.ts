export interface RawCharacter {
  uid: string;
  name: string;
  url: string;
}

export interface Character {
  uid: string;
  name: string;
  homeworld: string;
  species: string[];
  starships: string[];
  films: string[];
}

export interface ApiResponse {
  results: RawCharacter[];
  total_records: number;
}
