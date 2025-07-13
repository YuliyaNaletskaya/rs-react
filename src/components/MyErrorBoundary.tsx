import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class MyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught:', error);
    console.error('Information:', info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', color: '#c00' }}>
          <h2>Something went wrong...</h2>
          <p>Please reload the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
