import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class CurrencyRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinAmount: 0,
            inputValue: '',
            inputValid: true
        }
        this.saveCoinsToStorage = this.saveCoinsToStorage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentWillMount() {
        const coinsInStorage = localStorage.getItem(`cryptoCoins-${this.props.currency.id}`) !== null ? 
        Number.parseFloat(localStorage.getItem(`cryptoCoins-${this.props.currency.id}`)) :
        0;
        this.setState({
            coinAmount: coinsInStorage,
            inputValue: coinsInStorage
        })
    }
    saveCoinsToStorage(coins) {
        localStorage.setItem(`cryptoCoins-${this.props.currency.id}`, coins);
        this.setState({coinAmount: coins});
    }
    handleInputChange(event) {
        let checkRegex = /^\d*\.?\d+$/;
        this.setState({
            inputValue: event.target.value,
            inputValid: checkRegex.test(event.target.value)
        });
    }
    handleKeyPress(event) {
        if (event.key === 'Enter' && this.state.inputValid) {
            this.saveCoinsToStorage(this.state.inputValue);
        }
    }
    render() {
        const { currency, even } = this.props;
        const { coinAmount, inputValue, inputValid } = this.state;
        return (
            <tr className={`currencyRow ${even ? "currencyRow--white" : "currencyRow--grey"}`}>
                <td className="currencyRow__item"><Link to={`/currency/${currency.id}`}>
                    {currency.name}
                </Link></td>
                <td className="currencyRow__item">{currency.symbol}</td>
                <td className="currencyRow__item">$ {currency.quotes.USD.price}</td>
                <td className={`currencyRow__item ${currency.quotes.USD.percent_change_24h < 0 ? "currencyRow__item--red" : "currencyRow__item--green"}`}>{currency.quotes.USD.percent_change_24h} %</td>
                <td className="currencyRow__inputCell">
                    <input type="text" value={inputValue} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
                    <button disabled={!inputValid} onClick={() => this.saveCoinsToStorage(inputValue)}>Submit</button>
                </td>
                <td>{`$ ${coinAmount * currency.quotes.USD.price}`}</td>
            </tr>
        )
  }
}
