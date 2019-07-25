import React, {Component } from 'react';
import { Form, Field, ErrorMessage } from 'formik';

class LoginForm extends Component {
  render() {
    return (
      <Form>
        <Field type="text" name="email" placeholder="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" placeholder="password" />
        <ErrorMessage name="password" />
        <button type="submit"> Submit </button>
      </Form>
    );
  }
}

export default LoginForm;
