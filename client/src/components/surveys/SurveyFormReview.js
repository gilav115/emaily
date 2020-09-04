// shows users their form inputs for review

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// formValues  is this.props.formValues
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your survey</h5>
      {reviewFields}
      <button
        style={{ marginTop: '10px' }}
        className='yellow darken-3 white-text btn-flat'
        onClick={onCancel}
      >
        Edit
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className='green btn-flat right label white-text'
        style={{ marginTop: '10px' }}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
