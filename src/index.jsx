import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './Components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container'

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
    render() {
        return (            
            <Container id="container" className="justify-content-center" align="center" fluid>
                <MainView />
            </Container>
            
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);