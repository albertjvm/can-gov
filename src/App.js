import './App.css';
import {
  Bill,
  Bills,
  Header,
  MP,
  MPs,
  PostalCodeSearch,
  Speeches,
  Representatives,
  Vote,
  Votes,
} from './views';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route path="/bills/:session/:number"><Bill /></Route>
              <Route path="/bills/:session"><Bills /></Route>
              <Route path="/mps/:id"><MP /></Route>
              <Route path="/mps"><MPs /></Route>
              <Route path="/speeches"><Speeches /></Route>
              <Route path="/votes/:session/:number"><Vote /></Route>
              <Route path="/votes"><Votes /></Route>
              <Route path="/postalCode/:postalCode"><Representatives /></Route>
              <Route path="/"><PostalCodeSearch /></Route>
            </Switch>
          </main>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
