import React from 'react';
import PropTypes from 'prop-types';

const defaultOptions = { variant: 'info', dismissible: true };
let timeout; // eslint-disable-line

function Alert({
  show, text, dismissible, closeInSeconds, variant, onAlertClose,
}) {
  clearTimeout(timeout);
  timeout = null;
  if (show && closeInSeconds) {
    timeout = setTimeout(() => {
      onAlertClose();
    }, closeInSeconds * 1000);
  }

  return (
    <div
      className={`alert-container position-fixed w-100 fade ${(show ? 'show' : '')}`}
    >
      <div className={`alert alert-${variant || defaultOptions.variant} ${(dismissible || defaultOptions.dismissible ? 'alert-dismissible' : '')}`} role="alert">
        {text}
        {
          dismissible || defaultOptions.dismissible ? (
            <button type="button" className="close" aria-label="Close" onClick={onAlertClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          ) : ''
        }
      </div>
    </div>
  );
}

Alert.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
  onAlertClose: PropTypes.func,
  variant: PropTypes.string,
  dismissible: PropTypes.bool,
  closeInSeconds: PropTypes.number,
};

Alert.defaultProps = {
  show: false,
  onAlertClose: () => {},
  text: '',
  variant: 'info',
  dismissible: true,
  closeInSeconds: 5,
};

export default Alert;
