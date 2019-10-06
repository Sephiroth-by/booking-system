import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { register } from '../redux/actionCreators';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data, props) => { dispatch(register(data, props)); },
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: '400px',
  },
  textField: {
    margin: '5px 0',
    borderRadius: '3px',
    height: '25px',
    border: '1px solid #3d3d3d',
    padding: '5px',
  },
  error: {
    textAlign: 'left',
    fontSize: '10px',
    margin: '5px 0',
    color: 'red',
  },
  button: {
    height: '30px',
    background: '#fff',
    border: '1px solid #3d3d3d',
    borderRadius: '3px',
    margin: '20px 0',
  },
};

class Register extends Component {
  render() {
    const classes = this.props.classes;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(6)
            .max(16)
            .required(),
        })}
        onSubmit={values => {
          this.props.register(values, this.props);
        }}
        render={({ errors, status, touched }) => (
          <Form className={classes.container}>
            <p className={classes.error}>{this.props.user.errMess}</p>
            <Field className={classes.textField} type="text" name="email" placeholder="email" />
            <ErrorMessage className={classes.error} name="email" />
            <Field className={classes.textField} type="password" name="password" placeholder="password" />
            <ErrorMessage className={classes.error} name="password" />
            <button className={classes.button} type="submit"> Submit </button>
          </Form>
        )}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));
