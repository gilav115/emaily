// SurveyNew would render a SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = { showFormReview: false };
  //   }

  // this is identical to the constructor
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      // onSurveySubmit is added as a prop and can be accessible as this.props.onSurveySubmit
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

// here we don't specify destroyOnUnmount: false
// so if SurveyNew is unmounted then surveyForm is cleared
// we need this so we'll keep the form's values only when switching from new form to review form
export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);
