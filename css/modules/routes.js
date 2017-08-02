import React from 'react'
import App from '../App'
import Home from '../Home'
import About from '../About'
import Repos from '../Repos'
import Repo from '../Repo'
import { Router, Route, hashHistory,IndexRoute } from 'react-router';
export default class Routes extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='/about' component={About} />
                    <Route path='/repos' component={Repos} />
                    <Route path="/repos/:userName/:repoName" component={Repo}/>
                </Route>
            </Router>
        );
    }
}
