import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import { checkToken } from '../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  checkToken: () => { dispatch(checkToken()); },
});

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    if(this.props.user.loggedIn) {
      return <Redirect to='/'/>;
    }
    return (
      <div></div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);

