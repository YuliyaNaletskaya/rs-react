export interface Character {
  uid: string;
  name: string;
  description: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  homeworld: string;
}

export interface AppState {
  query: string;
  results: Character[];
  loading: boolean;
}

export interface ApiResponseSearch {
  message: string;
  result: RawCharacter[];
}

export interface ApiResponseGeneral {
  message: string;
  results: RawCharacter[];
}

export interface RawCharacter {
  uid: string;
  name?: string; // только у общего запроса
  description?: string;
  url: string;
  properties?: {
    name: string;
    birth_year: string;
    gender: string;
    hair_color: string;
    homeworld: string;
  };
}
