import { Component } from 'react';
import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import type { Character, RawCharacter } from './types/types';
import { fetchHomeworld } from './utils/fetchHomeworld';

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

    console.log('URL:', baseUrl);

    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      console.log('Full API response:', data);
      const rawResults: RawCharacter[] = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.result)
          ? data.result
          : [];
      const limitedResults = rawResults.slice(0, MAX_CHARACTERS);

      const getDescription: Character[] = await Promise.all(
        limitedResults.map(async (char) => {
          const props = char.properties;

          if (props) {
            return {
              uid: char.uid,
              name: props.name,
              description: char.description || 'no description',
              birth_year: props.birth_year || 'unknown',
              gender: props.gender || 'unknown',
              hair_color: props.hair_color || 'unknown',
              homeworld: await fetchHomeworld(props.homeworld),
            };
          }

          try {
            const charRes = await fetch(char.url);
            const charData = await charRes.json();
            const property = charData.result.properties;
            console.log('data', charData);

            return {
              uid: char.uid,
              name: property.name,
              description: charData.result.description || 'no description',
              birth_year: property.birth_year || 'unknown',
              gender: property.gender || 'unknown',
              hair_color: property.hair_color || 'unknown',
              homeworld: await fetchHomeworld(property.homeworld),
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
      console.log('Processed characters:', getDescription);
      this.setState({ results: getDescription });
    } catch (err) {
      console.error('Error loading data:', err);
      this.setState({ results: [] });
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
