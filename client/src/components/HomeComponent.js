import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { fetchMovies } from '../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (term) => { dispatch(fetchMovies(term)); },
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({term: event.target.value});
  }

  handleSearch(event) {
    if (this.state.term) {
      this.props.fetchMovies(this.state.term);
    }
    event.preventDefault();
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const movies = this.props.movies.movies.map((movie) => (
      <div key={movie._id}>
        <Link to={`/movie/${movie._id}`}>{movie.name}</Link>
      </div>
    ));

    return (
      <div>
        <div>
          <form onSubmit={this.handleSearch}>
            <input type="text" value={this.state.term} onChange={this.handleChange} />
          </form>
        </div>
        <h4>Home</h4>
        {movies}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

