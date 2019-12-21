import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useOnInputAction from '../../hooks/use-on-input-action';

function Favorite({ id, isChecked, onCheckChanged }) {
  function onChecked() {
    console.log('Checked');
    onCheckChanged(id);
  }

  function onUnchecked() {
    console.log('unchecked');
    onCheckChanged(id);
  }

  const {
    checked, handleInputChange,
  } = useOnInputAction(isChecked, onChecked, onUnchecked);

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <span>
      <input type="checkbox" checked={checked} onChange={handleInputChange} className="sr-only" name={`favorite-${id}`} id={`favorite-${id}`} />
      <label className="cursor-pointer" htmlFor={`favorite-${id}`}>
        <FontAwesomeIcon className={`${(checked ? 'text-danger' : 'text-secondary')} delivery-icon`} icon={faHeart} />
        <span className="sr-only">Favourite</span>
      </label>
    </span>
  );
}

Favorite.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckChanged: PropTypes.func,
};

Favorite.defaultProps = {
  onCheckChanged: () => {},
};

export default Favorite;
