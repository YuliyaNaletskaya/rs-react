import { Component } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

interface SearchState {
  input: string;
}

export class SearchBar extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { input: props.initialValue };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleClick = () => {
    const trimmed = this.state.input.trim();
    localStorage.setItem('searchQuery', trimmed);
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Star Wars characters..."
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}
