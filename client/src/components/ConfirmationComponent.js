import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import { orderSubmiting } from '../redux/actionCreators';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  order: state.order,
  user: state.user,
  movie: state.movie.movie,
  selectedCinema: state.movie.selectedCinema,
  selectedDate: state.movie.selectedDate,
  selectedTime: state.movie.selectedTime,
  selectedSeats: state.movie.selectedSeats,
});

const mapDispatchToProps = (dispatch) => ({
  submitOrder: (orderId, props) => { dispatch(orderSubmiting(orderId, props)); },
});

class Orders extends Component {

  constructor(props) {
    super(props);

    this.onConfirmClicked = this.onConfirmClicked.bind(this);
  }

  onConfirmClicked() {
    this.props.submitOrder(this.props.order.order.order._id, this.props);
  }

  render() {
    if (!this.props.user.loggedIn) {
      return <Redirect to='/' />;
    }

    return (
      <div>
        <h4>Order Details</h4>
        <p>{this.props.movie.name}</p>
        <p>{this.props.selectedCinema}</p>
        <p>{this.props.selectedDate}</p>
        <p>{this.props.selectedTime}</p>
        <p>Your seats: {this.props.selectedSeats.map(s => (<span key={s}>{`Row:${s[0] + 1}; Seat:${s[1] + 1}`}</span>))}</p>
        <Button variant="contained" color="primary" onClick={this.onConfirmClicked}>Place Order</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);

