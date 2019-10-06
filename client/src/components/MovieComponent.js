import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie, cinemaSelected, dateSelected, timeSelected, seatSelected, seatRemoved, orderSaving } from '../redux/actionCreators';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const mapStateToProps = state => ({
  movie: state.movie.movie,
  availableCinemas: state.movie.availableCinemas,
  availableDates: state.movie.availableDates,
  availableTimes: state.movie.availableTimes,
  selectedSession: state.movie.selectedSession,
  selectedCinema: state.movie.selectedCinema,
  selectedDate: state.movie.selectedDate,
  selectedTime: state.movie.selectedTime,
  selectedSeats: state.movie.selectedSeats,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovie: (id) => { dispatch(fetchMovie(id)); },
  selectCinema: (cinema) => { dispatch(cinemaSelected(cinema)); },
  selectDate: (date) => { dispatch(dateSelected(date)); },
  selectTime: (time) => { dispatch(timeSelected(time)); },
  selectSeat: (seat) => { dispatch(seatSelected(seat)); },
  removeSeat: (seat) => { dispatch(seatRemoved(seat)); },
  saveOrder: (sessionId, seats, props) => { dispatch(orderSaving(sessionId, seats, props)); },
});

const styles = {
  imageWrapper: {
    height: '300px',
  },
  image: {
    height: '100%',
    width: 'auto',
  },
  buttonsWrapper: {
    margin: '10px',
  },
  button: {
    margin: '5px',
  },
  buttonActive: {
    backgroundColor: '#ddd',
  },
  outerSeat: {
    width: '80px',
    height: '80px',
    borderRadius: '9px',
    border: '3px solid #D8D8D8',
    background: 'white',
    position: 'relative',
    margin: '4px',
    float: 'left',
    cursor: 'pointer',
  },
  innerSeat: {
    width: '70px',
    height: '70px',
    borderRadius: '4px',
    top: '50%',
    left: '50%',
    margin: '-35px 0px 0px -35px',
    background: '#D8D8D8',
    position: 'absolute',
  },
  clearBoth: {
    clear: 'both',
  },
  selectedInnerColor: {
    backgroundColor: '#3366CC',
  },
  selectedOuterColor: {
    borderColor: '#3366CC',
  },
  activeInnerColor: {
    backgroundColor: '#f50057',
  },
  activeOuterColor: {
    borderColor: '#f50057',
  },
  container: {
    margin: '40px 100px',
  },
};

class Movie extends Component {

  constructor(props) {
    super(props);

    this.onSeatClicked = this.onSeatClicked.bind(this);
    this.onConfirmClicked = this.onConfirmClicked.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovie(this.props.match.params.movieId);
  }

  onSeatClicked(seat) {
    const isSeatSelected = this.props.selectedSeats.find(s => seat[0] === s[0] && seat[1] === s[1]);
    if (isSeatSelected) { this.props.removeSeat(seat); }
    else { this.props.selectSeat(seat); }
  }

  onConfirmClicked() {
    this.props.saveOrder(this.props.selectedSession._id, this.props.selectedSeats, this.props);
  }

  render() {
    const classes = this.props.classes;

    const availableCinemas = this.props.availableCinemas.map((cinema) => (
      <Button className={this.props.selectedCinema === cinema ? classes.buttonActive : classes.button} variant="outlined" size="small" color="primary" key={cinema}
        onClick={this.props.selectCinema.bind(this, cinema)}>
        {cinema}
      </Button>
    ));
    const availableDates = this.props.availableDates.map((date) => (
      <Button className={this.props.selectedDate === date ? classes.buttonActive : classes.button} variant="outlined" size="small" color="secondary" key={date}
        onClick={this.props.selectDate.bind(this, date)}>
        {date}
      </Button>
    ));
    const availableTimes = this.props.availableTimes.map((time) => (
      <Button className={this.props.selectedTime === time ? classes.buttonActive : classes.button} variant="outlined" size="small" color="primary" key={time}
        onClick={this.props.selectTime.bind(this, time)}>
        {time}
      </Button>
    ));

    return (
      <div>
        <h4>Movie Details</h4>
        <h5>{this.props.movie && this.props.movie.name}</h5>
        <div className={classes.imageWrapper}>
          {!!this.props.movie && <img className={classes.image} src={require(`../../public${this.props.movie.poster}`)}></img>}
        </div>
        <div className={classes.buttonsWrapper}>{availableCinemas}</div>
        <div className={classes.buttonsWrapper}>{availableDates}</div>
        <div className={classes.buttonsWrapper}>{availableTimes}</div>
        {this.props.selectedSession && <SeatMap
          seats={this.props.selectedSession.seats}
          classes={classes}
          onClick={this.onSeatClicked}
        />}
        {!!this.props.selectedSeats.length && <Button variant="contained" color="primary" onClick={this.onConfirmClicked}>Confirm</Button>}
      </div>
    );
  }
}

class SeatMap extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <h6>Seat Map</h6>
        {this.props.seats.map((row, rowIndex) =>
          <div key={rowIndex}>
            {row.map((seat, seatIndex) =>
              <Seat key={rowIndex + '-' + seatIndex}
                seat={seat} rowIndex={rowIndex}
                seatIndex={seatIndex}
                classes={this.props.classes}
                onClick={this.props.onClick}></Seat>
            )}
            <br className={this.props.classes.clearBoth} />
          </div>)}
      </div>
    );
  }
}

class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ active: !this.state.active });
    this.props.onClick.call(this, [this.props.rowIndex, this.props.seatIndex]);
  }

  render() {
    return (
      this.props.seat ?
        <div className={`${this.props.classes.outerSeat} ${this.props.classes.selectedOuterColor}`}>
          <div className={`${this.props.classes.innerSeat} ${this.props.classes.selectedInnerColor}`}></div>
        </div> :
        <div className={`${this.props.classes.outerSeat} ${this.state.active ? this.props.classes.activeOuterColor : null}`}
          onClick={this.onClick}>
          <div className={`${this.props.classes.innerSeat} ${this.state.active ? this.props.classes.activeInnerColor : null}`}></div>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Movie));

