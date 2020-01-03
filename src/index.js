import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/login/login';
import Home from './components/home/home';
import TestComp from './components/testcomponent/testcomp';
import ErrorPage from './components/error/error';
import Admin from './components/admin/admin';
import Settings from './components/settings/settings';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render(
<BrowserRouter>
<Switch>
<Route exact path = "/" component = {(props) => <App {...props}/>} />
<Route exact path = "/home" component = {(props) => <Home {...props}/>} />
<Route exact path = "/error" component = {(props) => <ErrorPage {...props}/>} />
<Route exact path = "/admin" component = {(props) => <Admin {...props}/>} />
<Route exact path = "/logout" component = {(props) => <App {...props}/>} />
<Route exact path = "/settings" component = {(props) => <Settings {...props}/>} />
</Switch>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
