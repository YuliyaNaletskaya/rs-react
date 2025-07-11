import { Component } from 'react';
import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import type { Character, ApiResponse, RawCharacter } from './types/types';

const MAX_CHARACTERS = 10;

interface AppState {
  query: string;
  results: Character[];
}

export class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.state = {
      query: savedQuery,
      results: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.query);
  }

  fetchData = async (search: string) => {
    const baseUrl = search
      ? `https://www.swapi.tech/api/people/?name=${encodeURIComponent(search)}`
      : `https://www.swapi.tech/api/people/`;

    try {
      const res = await fetch(baseUrl);
      const data: ApiResponse = await res.json();
      const rawResults: RawCharacter[] = data.results || [];
      const limitedResults = rawResults.slice(0, MAX_CHARACTERS);

      const getDescription: Character[] = await Promise.all(
        limitedResults.map(async (char) => {
          try {
            const charRes = await fetch(char.url);
            const charData = await charRes.json();
            const props = charData.result.properties;
            console.log(charData);

            return {
              uid: char.uid,
              name: props.name,
              description: charData.result.description || 'no description',
              birth_year: props.birth_year || 'unknown',
              gender: props.gender || 'unknown',
              hair_color: props.hair_color || 'unknown',
              homeworld: await this.fetchText(props.homeworld),
            };
          } catch (error) {
            console.error('Error getting description:', error);
            return {
              uid: char.uid,
              name: char.name,
              description: 'no description',
              birth_year: 'unknown',
              gender: 'unknown',
              hair_color: 'unknown',
              homeworld: 'unknown',
            };
          }
        })
      );
      this.setState({ results: getDescription });
    } catch (err) {
      console.error('Error loading data:', err);
      this.setState({ results: [] });
    }
  };

  fetchText = async (url: string): Promise<string> => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return (
        data.result?.properties?.name ||
        data.result?.properties?.title ||
        'unknown'
      );
    } catch {
      return 'unknown';
    }
  };

  handleSearch = (query: string) => {
    this.setState({ query });
    this.fetchData(query);
  };

  render() {
    return (
      <div>
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={this.state.query}
        />

        <ResultsList results={this.state.results} />
      </div>
    );
  }
}

export default App;
