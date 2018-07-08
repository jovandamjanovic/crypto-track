import React, { Component } from "react";
import CurrencyRow from "./CurrencyRow";
// @ts-ignore
import loadingImg from '../loading.svg';

export default class CurrencyMain extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currencies: [],
        loading: true,
        currentPage: 0
      };
      this.nextPage = this.nextPage.bind(this);
      this.previousPage = this.previousPage.bind(this);
    }

    loadNewData(page) {
      this.setState({loading: true});
      fetch(`https://api.coinmarketcap.com/v2/ticker/?start=${page*10}&limit=10&structure=array`)
        .then(response => response.json())
        .then(res => {
          this.setState({currencies: res.data, loading: false});
          if(this.dataUpdateInterval !== undefined) {
            clearInterval(this.dataUpdateInterval);      
          }
          this.dataUpdateInterval = setInterval(() => {
            fetch(`https://api.coinmarketcap.com/v2/ticker/?start=${page*10}&limit=10&structure=array`)
              .then(response => response.json())
              .then(res => {
                this.setState({currencies: res.data});
              })
          }, 60000)
        });
    }

    componentDidMount() {
      this.loadNewData(this.state.currentPage);
    }

    componentWillUnmount() {
      clearInterval(this.dataUpdateInterval);
    }

    nextPage() {
      this.setState({currentPage: this.state.currentPage < 4 ? this.state.currentPage + 1 : this.state.currentPage});
      this.loadNewData(this.state.currentPage + 1);
    }

    previousPage() {
      this.setState({currentPage: this.state.currentPage > 0 ? this.state.currentPage - 1 : this.state.currentPage});
      this.loadNewData(this.state.currentPage - 1);
    }
  
    render() {
      const { currencies, loading, currentPage } = this.state;
      return (
        <div className="App">
          {loading ? <img src={loadingImg} alt="loading..."/> : 
          <div>
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
            </table>
            <div className="App__pagination">
              <button onClick={this.previousPage} disabled={currentPage === 0} className="App__pagination__button">{"<"}</button>
              <div className="App__pagination__pageNumber">{ currentPage + 1}</div>
              <button onClick={this.nextPage} disabled={currentPage === 4}className="App__pagination__button">{">"}</button>
            </div>
          </div>
        }
        </div>
      );
    }
  }