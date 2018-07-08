import React, { Component } from 'react';
// @ts-ignore
import loadingImg from '../loading.svg';

export default class CurrencyComp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currency: {},
        valueData: {
            price: 0,
            percent_change_1h: 0,
            percent_change_24h: 0,
            percent_change_7d: 0
        },
        loading: true
      }
    }
  
    componentDidMount() {
      fetch(`https://api.coinmarketcap.com/v2/ticker/${this.props.match.params.currencyId}/`)
        .then(response => response.json())
        .then(res => {
          this.setState({currency: res.data, valueData: res.data.quotes.USD, loading: false});
        });
    }
  
    render () {
      const { loading } = this.state;
      const { name, symbol, rank, circulating_supply, total_supply, max_supply } = this.state.currency;
      const { price, percent_change_1h: value1h , percent_change_24h: value24h, percent_change_7d: value7d } = this.state.valueData;
      return (
        <div className="App">
        {loading ? <img src={loadingImg} alt="loading..."/> : 
        <div className="singleCurrency">
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Currency Name:
                </div>
                <div className="singleCurrency__item__value">
                    {name}
                </div>
            </div>
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Symbol:
                </div>
                <div className="singleCurrency__item__value">
                    {symbol}
                </div>
            </div>
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Currency Rank:
                </div>
                <div className="singleCurrency__item__value">
                    {rank}
                </div>
            </div>
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Circulating Supply:
                </div>
                <div className="singleCurrency__item__value">
                    {circulating_supply}
                </div>
            </div>
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Total Supply:
                </div>
                <div className="singleCurrency__item__value">
                    {total_supply}
                </div>
            </div>
            <div className="singleCurrency__item">
                <div className="singleCurrency__item__key">
                    Max Supply:
                </div>
                <div className="singleCurrency__item__value">
                    {max_supply}
                </div>
            </div>
            <div className="singleCurrency__item currencyValues">
                <div className="currencyValues__title">Value</div>
                <div className="currencyValues__values">
                    <div className={`currencyValues__values__item`}>
                        <div className="currencyValues__values__item__key">Current</div>
                        <div className="currencyValues__values__item__value">$ {price}</div>
                    </div>
                    <div className={`currencyValues__values__item`}>
                        <div className="currencyValues__values__item__key">Last hour</div>
                        <div className={`currencyValues__values__item__value ${value1h < 0 ? "currencyValues__values__item--red" : "currencyValues__values__item--green"}`}>{value1h} %</div>
                    </div>
                    <div className={`currencyValues__values__item`}>
                        <div className="currencyValues__values__item__key">Last 24 hours</div>
                        <div className={`currencyValues__values__item__value ${value24h < 0 ? "currencyValues__values__item--red" : "currencyValues__values__item--green"}`}>{value24h} %</div>
                    </div>
                    <div className={`currencyValues__values__item`}>
                        <div className="currencyValues__values__item__key">Last week</div>
                        <div className={`currencyValues__values__item__value ${value7d < 0 ? "currencyValues__values__item--red" : "currencyValues__values__item--green"}`}>{value7d} %</div>
                    </div>
                </div>
            </div>
        </div>}
        </div>
      )
    }
  }