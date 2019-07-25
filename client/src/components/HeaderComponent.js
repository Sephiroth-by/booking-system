import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {authLogOut, checkToken} from '../redux/actionCreators';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authLogOut: () => { dispatch(authLogOut()); },
  checkToken: () => { dispatch(checkToken()); },
});

class Header extends Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    let links;
    if(this.props.user.loggedIn) {
      links = <div>
        <Link to='/orders'>My Orders</Link>
        <a href="#" onClick={this.props.authLogOut}>Log Out</a>
      </div>;
    }
    else {
      links = <div>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>;
    }

    return (
      <div>
        <div>Header</div>
        <Link to='/'>Home</Link>
        {links}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
