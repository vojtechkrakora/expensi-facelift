import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            query: "",
            max: 0.0,
            min: 0.0
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
            }.bind(this)
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
            }.bind(this)
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
            }.bind(this)
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
            }.bind(this)
        })

        this.getMax(query);
        this.getMin(query);
    };

    render() {
        return (
            <div>
                <table className="blueTable">
                    <thead>
                    <tr>
                        <th>Maximum</th>
                        <th>Minimum</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.max}</td>
                        <td>{this.state.min}</td>
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
                                <td>{item.Datum}</td>
                                <td>{item.Objem}</td>
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

ReactDOM.render(<App/>, document.getElementById('root'))