import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Homepage } from './Pages/Homepage/Homepage';
import { AddMovie } from './Pages/AddMovie/AddMovie';
import { DiscoverLanguage } from './Pages/DiscoverLanguage/DiscoverLanguage';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Homepage} />
        <AuthorizeRoute exact path='/AddMovie' component={AddMovie} />
        <Route exact path='/DiscoverLanguage' component={DiscoverLanguage} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
