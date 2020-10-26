import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CountryForm from "./components/country/CountryForm";
import CountryList from "./components/country/CountryList";

function App() {
  const [searchedCountries, SetSearchedCountries] = useState([]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/countries-list">
            <CountryList countriesList={searchedCountries} />
          </Route>
          <Route exact path="/">
            <CountryForm onCountriesSearched={(data) => SetSearchedCountries(data)} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
