import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { fetchOrders } from '../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (type) => { dispatch(fetchOrders(type)); },
});

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders('future');
  }

  render() {
    if (!this.props.user.loggedIn) {
      return <Redirect to='/' />;
    }

    const orders = this.props.orders.orders.map((order) => (
      <div key={order._id}>
        <Link to={`/movie/${order.session.movie._id}`}>{order.session.movie.name}</Link>
      </div>
    ));

    return (
      <div>
        <h4>Orders</h4>
        {orders}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);

