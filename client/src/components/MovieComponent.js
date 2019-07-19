import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../redux/actionCreators';

const mapStateToProps = state => ({
  movie: state.movie,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovie: (id) => { dispatch(fetchMovie(id)); },
});

class Movie extends Component {

  componentDidMount() {
    this.props.fetchMovie(this.props.match.params.movieId);
  }

  render() {
    return (
      <div>
        <div>Movie Details</div>
        <div>{this.props.movie.movie && this.props.movie.movie.movie.name}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

