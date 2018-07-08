import React, { Component } from "react";
import CurrencyRow from "./CurrencyRow";
// @ts-ignore
import loadingImg from '../loading.svg';

export default class CurrencyMain extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currencies: [],
        loading: true
      }
    }
    
    componentDidMount() {
      fetch("https://api.coinmarketcap.com/v2/ticker/?limit=50&structure=array")
        .then(response => response.json())
        .then(res => {
          this.setState({currencies: res.data, loading: false});
          this.dataUpdateInterval = setInterval(() => {
            fetch("https://api.coinmarketcap.com/v2/ticker/?limit=50&structure=array")
              .then(response => response.json())
              .then(res => {
                this.setState({currencies: res.data});
              })
          }, 60000)
        });
    }
  
    componentWillUnmount() {
      clearInterval(this.dataUpdateInterval);
    }
  
    render() {
      const { currencies, loading } = this.state;
      return (
        <div className="App">
          {loading ? <img src={loadingImg} alt="loading..."/> : 
          <table className="cryptoTable">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Short Name</th>
                <th>$ Value</th>
                <th>Last 24h</th>
                <th>Amount you own</th>
                <th>$ value of your own coin</th>
              </tr>
              {currencies.map((c, i) => (<CurrencyRow key={`crypto-${i}`} even={i % 2 === 1} currency={c} />))}
            </tbody>
          </table> }
        </div>
      );
    }
  }