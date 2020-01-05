import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Currency from '../currency/currency';
import Favorite from '../favorite/favorite';

function GridItem(props) {
  const {
    id, favorite, onCheckChanged, title, price, description, url, imgUrl,
  } = props;
  const { t } = useTranslation();

  console.log('props', props);
  console.log('imgUrl', imgUrl);
  return (
    <div className="card ee-card h-100" data-id={id}>
      <div className="item-image-wrapper">
        <img src={imgUrl} className="card-img-top" alt="{title}" />
        <div className="favorite-wrapper">
          <Favorite id={id} isChecked={favorite} onCheckChanged={onCheckChanged} />
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column h-100">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          {url ? (<a href={url}>Check out my external link</a>) : ''}
          <div className="card-text mb-0 pt-2 mt-auto d-flex justify-content-between">
            <a href={`/item-view/${id}`}>{t('catalog.item.view')}</a>
            <span>
              <Currency type="GBP" />
              {price || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.string.isRequired,
  favorite: PropTypes.bool,
  onCheckChanged: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number,
  url: PropTypes.string,
  imgUrl: PropTypes.string,
};

GridItem.defaultProps = {
  price: 0,
  description: '',
  url: '',
  favorite: false,
  onCheckChanged: () => {},
  imgUrl: 'https://www.placehold.it/300x200',
};

export default GridItem;
