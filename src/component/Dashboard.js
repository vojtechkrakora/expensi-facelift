import React from 'react';
import NumberFormat from 'react-number-format'
import './Dashboard.css';
import $ from 'jquery';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Dashboard extends React.Component {
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
        if (query !== "" && query.length < 3) {
            return;
        }

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

    componentDidMount() {
        $.ajax({
            url: "http://localhost:9090/records/",
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

        this.getMax("");
        this.getMin("");
        this.getAmount("");
    }


    render() {
        const StyledTableCell = withStyles((theme) => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles((theme) => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        }))(TableRow);

        return (
            <div id="Dashboard">
                <input type="text" placeholder="Search..."
                       onChange={this.handleInputChange}/>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Datum</StyledTableCell>
                                <StyledTableCell align="right">Castka</StyledTableCell>
                                <StyledTableCell align="right">Mena</StyledTableCell>
                                <StyledTableCell align="right">Poznamka</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.data.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {
                                            Intl.DateTimeFormat('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            }).format(new Date(row.Datum))
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{
                                        <NumberFormat value={row.Objem} displayType={'text'}
                                                                                  thousandSeparator={' '}/>}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.Měna}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Poznámka}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

