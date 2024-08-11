import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../auth/authSlice';


const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  contactNumber: Yup.string().matches(/^\d{10}$/, 'Contact number must be 10 digits').required('Contact number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  country: Yup.string().required('Country is required'),
  //language: Yup.string().required('Language is required')
});

const countries = ['India', 'USA', 'Australia', 'UK', 'Canada'];
const languages = [
  'English', 'Hindi', 'Spanish', 'French', 'German',
  'Chinese', 'Japanese', 'Russian', 'Portuguese', 'Italian',
  'Korean', 'Arabic', 'Turkish', 'Dutch', 'Swedish', 'Polish'
];

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(signUpUser(values)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/main');
      }
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        password: '',
       // language: '',
        country: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
          {authStatus === 'failed' && <p className="text-red-500 mb-4">{authError}</p>}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
            </div>
            <div className="w-1/2">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <Field
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="contactNumber" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          <div className="mb-4">
            <Field
              as="select"
              name="country"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="" label="Select Country" />
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Field>
            <ErrorMessage name="country" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div>
          {/* <div className="mb-4">
            <Field
              as="select"
              name="language"
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              <option value="" label="Select Language" />
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Field>
            <ErrorMessage name="language" component="p" className="text-red-500 text-xs md:text-sm mt-1" />
          </div> */}

          <button type="submit" className="bg-black-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors duration-300 text-sm md:text-base" disabled={isSubmitting || authStatus === 'loading'}>
            {isSubmitting || authStatus === 'loading' ? 'Creating Account...' : 'Create Account'}
          </button>

         
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
