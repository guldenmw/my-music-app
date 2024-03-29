import React, { FC } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

import store from './store';

import SearchArtists from '../pages/SearchArtists';
import SearchReleases from '../pages/SearchReleases';
import Favorites from '../pages/Favorites';


const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar bg='primary'>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse>
            <Link className={'text-white font-weight-bold mx-2 my-2'} to='/my_artists'>My Artists</Link>
            <Link className={'text-white font-weight-bold mx-2 my-2'} to='/search_artists'>Search Artists</Link>
            <Link className={'text-white font-weight-bold mx-2 my-2'} to='/search_releases'>Search Releases</Link>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path='/my_artists'>
              <Favorites/>
          </Route>
          <Route path='/search_artists'>
              <SearchArtists/>
          </Route>
          <Route path='/search_releases'>
              <SearchReleases/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
