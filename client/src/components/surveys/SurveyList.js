import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className='card darken-1' key={survey._id}>
          <p className='right'>
            <button
              onClick={() =>
                this.props.deleteSurvey(survey._id, this.props.history)
              }
              style={{ marginRight: '5px' }}
              type='submit'
              class='btn-floating btn waves-effect waves-light red'
            >
              <i class='material-icons'>delete</i>
            </button>
          </p>
          <div className='card-content'>
            <span className='card-title'>{survey.title}</span>
            <p>{survey.body}</p>
            <p className='right'>
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className='card-action'>
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

// function mapStateToProps(state) {
//   return { surveys: state.surveys }; // it's state.surveys as we set in the surveysReducer
// }

function mapStateToProps({ surveys }) {
  return { surveys }; // same as above
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
  withRouter(SurveyList)
);
