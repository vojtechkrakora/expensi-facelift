import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabs from './ExpTabs';

class App extends React.Component {

    render() {
        return (
            <div id="root">
                <Tabs/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));