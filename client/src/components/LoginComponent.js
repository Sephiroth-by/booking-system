import React, {Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { login } from '../redux/actionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data, props) => { dispatch(login(data, props)); },
});

class Login extends Component {
  render() {
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
          this.props.login(values, this.props);
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <p style={{color: 'red'}}>{this.props.user.errMess}</p>
            <Field type="text" name="email" placeholder="email" />
            <ErrorMessage name="email" />
            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" />
            <button type="submit"> Submit </button>
          </Form>
        )}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
