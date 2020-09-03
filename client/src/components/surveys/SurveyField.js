// Contains logic to render a single label and text input

import React from 'react';

// redux form allows us to pass props to this function
// input is props.input
// {...input} => onChange={input.onChange} onBlur={input.onBlur}
// meta we get from redux-form, we can console log it.
// meta would have the error string and whether the user touched the input element
export default ({ input, label, meta: { error, touched, active } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className='red-text' style={{ marginBottom: '20px' }}>
        {!active && touched && error}
      </div>
    </div>
  );
};
