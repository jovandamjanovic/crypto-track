import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CurrencyComp from "./CurrencyComp";
import CurrencyMain from "./CurrencyMain";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" render={() => <CurrencyMain />} />
      <Route path="/currency/:currencyId" render={props => <CurrencyComp { ...props }/>} />
    </div>
  </Router>
);

export default App;
