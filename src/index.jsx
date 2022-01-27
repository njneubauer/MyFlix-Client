import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
    render() {
        return (        
            <Provider store={store}>
                <Container id="container" className="justify-content-center" align="center" fluid>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);