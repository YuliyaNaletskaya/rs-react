import { Component } from 'react';
import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import type { Character, ApiResponse, RawCharacter } from './types/types';

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

      const getDescription: Character[] = await Promise.all(
        rawResults.map(async (char) => {
          try {
            const charRes = await fetch(char.url);
            const charData = await charRes.json();
            const props = charData.result.properties;

            const [homeworld, species, starships, films] = await Promise.all([
              this.fetchText(props.homeworld),
              Promise.all(props.species.map(this.fetchText)),
              Promise.all(props.starships.map(this.fetchText)),
              Promise.all(props.films ?? [].map(this.fetchText)),
            ]);
            return {
              uid: char.uid,
              name: props.name,
              homeworld,
              species,
              starships,
              films,
            };
          } catch {
            return {
              uid: char.uid,
              name: char.name,
              homeworld: 'неизвестно',
              species: [],
              starships: [],
              films: [],
            };
          }
        })
      );
      this.setState({ results: getDescription });
    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
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
        'неизвестно'
      );
    } catch {
      return 'неизвестно';
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
