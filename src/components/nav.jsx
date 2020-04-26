import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Nav({ routes, isAdmin }) {
  const [t] = useTranslation();
  return (
    <ul
      className={cx({
        'navbar-nav mr-auto': !isAdmin,
        'nav nav-tabs': isAdmin,
      })}
    >
      {routes.map(({ path, name, isHidden }) =>
        isHidden ? (
          ''
        ) : (
          <li key={path} className="nav-item ml-2">
            <NavLink exact={path === '/'} className="nav-link" to={path}>
              {t(`header.nav.${name}`)}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );
}

Nav.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isHidden: PropTypes.bool,
    }),
  ).isRequired,
  isAdmin: PropTypes.bool,
};

Nav.defaultProps = {
  isAdmin: false,
};

export default Nav;
