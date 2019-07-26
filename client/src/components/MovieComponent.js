import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchMovie, cinemaSelected, dateSelected, timeSelected, seatSelected, seatRemoved, orderSaving } from '../redux/actionCreators';

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
    if(isSeatSelected)
    { this.props.removeSeat(seat); }
    else
    { this.props.selectSeat(seat); }
  }

  onConfirmClicked() {
    this.props.saveOrder(this.props.selectedSession._id, this.props.selectedSeats, this.props);
  }

  render() {
    const availableCinemas = this.props.availableCinemas.map((cinema) => (
      <div key={cinema}>
        <div onClick = {this.props.selectCinema.bind(this, cinema)}>{cinema}</div>
      </div>
    ));
    const availableDates = this.props.availableDates.map((date) => (
      <div key={date}>
        <div onClick = {this.props.selectDate.bind(this, date)}>{date}</div>
      </div>
    ));
    const availableTimes = this.props.availableTimes.map((time) => (
      <div key={time}>
        <div onClick = {this.props.selectTime.bind(this, time)}>{time}</div>
      </div>
    ));

    return (
      <div>
        <div>Movie Details</div>
        <div>{this.props.movie && this.props.movie.name}</div>
        {availableCinemas}
        {availableDates}
        {availableTimes}
        {this.props.selectedSession && <SeatMap
          seats = { this.props.selectedSession.seats }
          onClick = { this.onSeatClicked }
        />}
        {!!this.props.selectedSeats.length && <button type="button" onClick={this.onConfirmClicked}>Confirm</button>}
      </div>
    );
  }
}

class SeatMap extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.props.seats.map((row, rowIndex) =>
              <tr key={rowIndex}>
                {row.map((seat, seatIndex) =>
                  seat ?
                    <td key={rowIndex + '-' + seatIndex} className="reserved">{seat}</td> :
                    <td key={rowIndex + '-' + seatIndex} className="available" onClick = {this.props.onClick.bind(this, [rowIndex, seatIndex])}>{seat}</td>
                )}
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

