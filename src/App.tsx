import { Component } from 'react';
import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import type { AppState, Character, RawCharacter } from './types/types';
import { fetchHomeworld } from './utils/fetchHomeworld';
import { Spinner } from './components/Spinner';
import './App.css';
import { Header } from './components/Header';

const MAX_CHARACTERS = 10;
const BrokenComponent = () => {
  throw new Error('Component is broke!');
};

export class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.state = {
      query: savedQuery,
      results: [],
      loading: false,
      triggerError: false,
    };
  }

  componentDidMount() {
    this.fetchData(this.state.query);
  }

  fetchData = async (search: string) => {
    this.setState({ loading: true });
    const baseUrl = search
      ? `https://www.swapi.tech/api/people/?name=${encodeURIComponent(search)}`
      : `https://www.swapi.tech/api/people/`;

    try {
      const res = await fetch(baseUrl);
      const data = await res.json();

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

      this.setState({ results: getDescription, loading: false });
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
        <Header />

        <div style={{ position: 'relative' }}>
          <SearchBar
            onSearch={this.handleSearch}
            initialValue={this.state.query}
          />

          {this.state.loading && <Spinner />}

          <div
            style={{
              filter: this.state.loading ? 'blur(3px)' : 'none',
              pointerEvents: this.state.loading ? 'none' : 'auto',
              transition: 'filter 0.3s ease',
            }}
          >
            <button
              className="brouke"
              style={{ margin: '1rem 0', padding: '0.2rem' }}
              onClick={() => this.setState({ triggerError: true })}
            >
              Broke (Test)
            </button>
            {this.state.triggerError && <BrokenComponent />}
            <ResultsList results={this.state.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
