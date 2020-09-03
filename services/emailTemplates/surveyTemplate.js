const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>We would love to know if you enjoyed our services!</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                </div>
            </div>
        </body>
    </html>
  `;
};
