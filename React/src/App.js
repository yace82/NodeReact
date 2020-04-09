import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Navigation from './components/Navigation';

import Home          from './pages/Home';
import CreateArticle from './pages/CreateArticle';
import DeleteArticle from './pages/DeleteArticle';
import ViewArticle from   './pages/ViewArticle';
import CreateComment from './pages/CreateComment';
import DeleteComment from './pages/DeleteComment';
import NotFound      from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/"          component={Home}          />
        <Route path="/articles/create" component={CreateArticle} />
        <Route path="/articles/delete" component={DeleteArticle} />
        <Route path="/article/:id "    component={ViewArticle} />
        <Route path="/comments/create" component={CreateComment} />
        <Route path="/comments/delete" component={DeleteComment} />
        <Route path="*"                component={NotFound}      />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
