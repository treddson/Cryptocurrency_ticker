
import React, { Component } from 'react';
import './Ticker.css';
import axios from 'axios';
import Cryptocurrency from './Cryptocurrency';



export default class Ticker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
            data: [ 
                { 
                    id: "bitcoin", 
                    name: "Bitcoin",
                    symbol: "BTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }, 
                {
                    id: "ethereum",
                    name: "Ethereum",
                    symbol: "ETH",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                },
                {
                    id: "litecoin",
                    name: "Litecoin",
                    symbol: "LTC",
                    price_usd: "1",
                    percent_change_1h: "0",
                    percent_change_24h: "0",
                    percent_change_7d: "0",
                }   
            ] 
        };
    }
    
    componentDidMount() {
        this.fetchCryptoCurrencyData();
        this.interval = setInterval(() => this.fetchCryptoCurrencyData(), 60 * 100);
    }
    
    fetchCryptoCurrencyData() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
            .then(response => {
                let wanted = ["bitcoin", "ethereum", "litecoin"];
                let result = response.data.filter(currency => wanted.includes(currency.id));
                this.setState({ data: result });
            })
            .catch(err => console.log(err));

    }
    render() {
        const tickers = this.state.data.map( currency =>
            <Cryptocurrency data={currency} key={currency.id} />
        );
        return (
            <div className="tickers-container">
                <ul className="tickers">{tickers}</ul>
                <p>Information updated every minute - courtesy of <a href="https://www.coinmarketcap.com" target="_blank">coinmarketcap.com</a></p>
            </div>
        );
    }
}

