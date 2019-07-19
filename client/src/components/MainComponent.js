import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import Movie from './MovieComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';


class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch location={this.props.location}>
          <Route path='/home' component={Home} />
          <Route path='/movie/:movieId' component={Movie} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
