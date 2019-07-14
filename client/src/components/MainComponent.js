import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovies } from '../redux/actionCreators';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => { dispatch(fetchMovies()); },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch location={this.props.location}>
          <Route path='/home' component={() => <Home movies={this.props.movies} />} />
          {/* <Route path='/movie/:movieId' component={Movie} /> */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
