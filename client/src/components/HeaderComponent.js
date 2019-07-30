import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {authLogOut, checkToken} from '../redux/actionCreators';

import { Button, Typography, Toolbar, AppBar, withStyles } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authLogOut: () => { dispatch(authLogOut()); },
  checkToken: () => { dispatch(checkToken()); },
});

const styles = {
  linkWrapper: {
    flexGrow: 1,
    textAlign: 'right',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px',
  },
};

class Header extends Component {

  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    const classes = this.props.classes;

    let links;
    if(this.props.user.loggedIn) {
      links = <div className={classes.linkWrapper}>
        <Link className={classes.link} to='/orders'>My Orders</Link>
        <Button className={classes.link} onClick={this.props.authLogOut}>Log Out</Button>
      </div>;

    }
    else {
      links = <div className={classes.linkWrapper}>
        <Link className={classes.link} to='/login'>Login</Link>
        <Link className={classes.link} to='/register'>Register</Link>
      </div>;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to='/'>Movies</Link>
            </Typography>
            {links}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
