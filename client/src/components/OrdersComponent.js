import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { fetchOrders } from '../redux/actionCreators';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (type) => { dispatch(fetchOrders(type)); },
});

const styles = {
  container: {
    display: 'flex',
    margin: '0 20px',
    flexWrap: 'wrap',
  },
  order: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
};
class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders('future');
  }

  render() {
    const classes = this.props.classes;

    if (!this.props.user.loggedIn) {
      return <Redirect to='/' />;
    }

    const orders = this.props.orders.orders.map((order) => (
      <div className={classes.order} key={order._id}>
        <Link to={`/movie/${order.session.movie._id}`}>{order.session.movie.name}</Link>
        <div>Row {order.seats[0][0]} Seat {order.seats[0][1]}</div>
        <div>{order.session.cinema.name}</div>
        <div>{order.session.startTime.split('T')[0]}</div>
      </div>
    ));

    return (
      <div>
        <h4>My Orders</h4>
        <div className={classes.container}>
          {orders}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders));


