// SurveyForm contains multiple SurveyFields

import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import ValidateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          type='text'
          label={label}
          name={name}
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button className='teal btn-flat right white-text' type='submit'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

// values is identical to the object we recieve upon submit (title, subject...)
function validate(values) {
  // if errors is return empty then redux-form would know all is good
  // if value exist redux-form would know something is wrong
  // redux-form would match the property we attach to the errors and associate it with
  // the name value in Field we're trying to render
  // so errors.title would match Field element with name="title"
  const errors = {};

  errors.recipients = ValidateEmails(values.recipients || '');

  _.each(formFields, ({ name, validationError }) => {
    if (!values[name]) {
      errors[name] = validationError;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm', // would be added to the reducer as state.form.surverForm (in mapStateToProps in SurveyFormReview)
  validate, // validate: validate,
  destroyOnUnmount: false, // don't dump the form values when this component is unmounted
})(SurveyForm);
