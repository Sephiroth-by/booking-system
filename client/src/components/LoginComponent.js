import LoginForm from './LoginForm';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { login } from '../redux/actionCreators';
import { connect } from 'react-redux';

const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .max(16)
    .required(),
});

const FormWrapper = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  handleSubmit: (values, { props }) => {
    props.login(values);
  },
  validationSchema: LoginValidation,
})(LoginForm);

const mapDispatchToProps = (dispatch) => ({
  login: (data) => { dispatch(login(data)); },
});

export default connect(
  null,
  mapDispatchToProps,
)(FormWrapper);


