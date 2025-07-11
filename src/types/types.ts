export interface RawCharacter {
  uid: string;
  name: string;
  url: string;
}

export interface Character {
  uid: string;
  name: string;
  description: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  homeworld: string;
}

export interface ApiResponse {
  results: RawCharacter[];
  total_records: number;
}
