export interface Character {
  uid: string;
  name: string;
  description: string;
  birth_year: string;
  gender: string;
  hair_color?: string;
  height?: string;
  eye_color?: string;
  mass?: string;
  homeworld: string;
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
  name?: string;
  description?: string;
  url: string;
  properties?: {
    name: string;
    birth_year: string;
    gender: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
  };
}

export interface FilmData {
  title: string;
  characters: string[];
  starships?: string[];
}

export interface FilmApiResponse {
  result: {
    properties: FilmData;
  }[];
}
