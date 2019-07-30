import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { fetchMovies } from '../redux/actionCreators';
import { connect } from 'react-redux';

import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, TextField, withStyles } from '@material-ui/core';

const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (term) => { dispatch(fetchMovies(term)); },
});

const styles = {
  card: {
    flexBasis: '25%',
    padding: '10px',
    margin: '10px',
  },
  media: {
    height: 140,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
  },
  cardActions: {
    justifyContent: 'center',
  },
  textField: {
    width: '80%',
  },
};

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
    const classes = this.props.classes;

    const movies = this.props.movies.movies.map((movie) => (
      <Card key={movie._id} className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require(`../../public${movie.poster}`)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {movie.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Link className={classes.link} to={`/movie/${movie._id}`}>{movie.name}</Link>
        </CardActions>
      </Card>
    ));

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSearch}>
          <TextField
            id="outlined-search"
            label="Search Movie"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={this.state.term}
            onChange={this.handleChange}
          />
        </form>
        <div className={classes.grid}>
          {movies}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

