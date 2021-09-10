import './App.css';
import {
  Header,
  MP,
  MPs,
  PostalCodeSearch,
  Representatives,
  Vote,
  Votes,
} from './views';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/mps/:id"><MP /></Route>
            <Route path="/mps"><MPs /></Route>
            <Route path="/votes/:session/:number"><Vote /></Route>
            <Route path="/votes"><Votes /></Route>
            <Route path="/postalCode/:postalCode"><Representatives /></Route>
            <Route path="/"><PostalCodeSearch /></Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
