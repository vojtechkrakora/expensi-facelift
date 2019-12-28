import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format'
import './index.css';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            query: "",
            max: 0.0,
            min: 0.0,
            amount: 0.0
        }

    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:9090/records",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({data: data});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }

    getMax(query) {
        $.ajax({
            url: "http://localhost:9090/records/max/" + query,
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({max: data.maxByNote});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }

    getMin(query) {
        $.ajax({
            url: "http://localhost:9090/records/min/" + query,
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({min: data.minByNote});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }

    getAmount(query) {
        $.ajax({
            url: "http://localhost:9090/records/amount/" + query,
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({amount: data.amountByNote});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        })
    }

    handleInputChange = event => {
        const query = event.target.value;

        $.ajax({
            url: "http://localhost:9090/records/" + query,
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {

                this.setState({data: data});
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        });

        this.getMax(query);
        this.getMin(query);
        this.getAmount(query);
    };

    render() {
        return (
            <div>
                <table className="blueTable">
                    <thead>
                    <tr>
                        <th>Maximum</th>
                        <th>Minimum</th>
                        <th>Average</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{<NumberFormat value={this.state.max} displayType={'text'} thousandSeparator={' '} suffix={' [CZK]'}/>}</td>
                        <td>{<NumberFormat value={this.state.min} displayType={'text'} thousandSeparator={' '} suffix={' [CZK]'}/>}</td>
                        <td>{isNaN(this.state.amount) ? '' : <NumberFormat value={(this.state.amount/this.state.data.length)} displayType={'text'} thousandSeparator={' '} suffix={' [CZK]'}/>}</td>
                        <td>{<NumberFormat value={this.state.amount} displayType={'text'} thousandSeparator={' '} suffix={' [CZK]'}/>}</td>
                    </tr>
                    </tbody>
                </table>
                <input type="text" className="input" placeholder="Search..."
                       onChange={this.handleInputChange}/>
                <table class="blueTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Datum</th>
                        <th>Částka</th>
                        <th>Měna</th>
                        <th>Poznámka</th>
                    </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {

                        return (
                            <tr key={key}>
                                <td>{item.id}</td>
                                <td>{
                                    Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(item.Datum))
                                }
                                </td>
                                <td>{<NumberFormat value={item.Objem} displayType={'text'} thousandSeparator={' '}/>}</td>
                                <td>{item.Měna}</td>
                                <td>{item.Poznámka}</td>
                            </tr>
                        )

                    })}</tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));