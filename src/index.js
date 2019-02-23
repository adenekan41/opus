import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/bootstrap.min.css'
import './assets/css/normalize.css'
import './assets/css/animate.css'
import './assets/css/ionicons.min.css'
import './assets/css/style.css'
// import './assets/js/bootstrap.min.js'
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
