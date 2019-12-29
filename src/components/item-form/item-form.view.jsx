import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useFormInputHandle from '../../hooks/use-form-input-handle';

function ItemFormView({ item, onSubmit } = {}) {
  console.log('ITM', item);

  const defaultFormData = {
    title: '',
    description: '',
    price: 0,
    url: '',
    imgUrl: '',
  };

  const [formItem, setformItem] = useState(defaultFormData);

  const {
    inputs, setInputs, handleInputChange, handleSubmit,
  } = useFormInputHandle({
    id: item.id,
    title: item.title || defaultFormData.title,
    description: item.description || defaultFormData.description,
    price: item.price || defaultFormData.price,
    url: item.url || defaultFormData.url,
    imgUrl: item.imgUrl || defaultFormData.imgUrl,
  }, () => {
    console.log('createItem?', inputs, formItem);

    if (!inputs || !Object.keys(inputs).length) {
      return;
    }

    if (inputs.price && typeof inputs.price === 'string') {
      inputs.price = parseInt(inputs.price, 10);
    }

    setformItem(inputs);

    const itm = {};

    Object.keys(inputs).forEach(k => {
      // itm[k] = inputs[k] || null;
      itm[k] = inputs[k];
    });

    if (inputs.title !== '' && !inputs.id) {
      console.log('creatingItem', itm);
      onSubmit({ type: 'create', item: itm });
    }

    if (inputs.title !== '' && inputs.id) {
      console.log('updating formItem', itm);
      onSubmit({ type: 'update', item: itm });
    }
  }, [item]);

  // eslint-disable-next-line
  function resetForm() {
    setInputs(defaultFormData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Title *
            <input id="title" name="title" type="text" value={inputs.title} onChange={handleInputChange} className="form-control" aria-describedby="titleHelp" />
          </label>
          <small id="titleHelp" className="form-text text-muted">
            Title to display in the catalog
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description
            <textarea id="description" name="description" value={inputs.description} onChange={handleInputChange} className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="price">
            Price
            <input id="price" name="price" type="number" value={inputs.price} onChange={handleInputChange} className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="url">
            Url
            <input id="url" name="url" type="text" value={inputs.url} onChange={handleInputChange} className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="imgUrl">
            Image Url
            <input id="imgUrl" name="imgUrl" type="text" value={inputs.imgUrl} onChange={handleInputChange} className="form-control" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-danger ml-2" onClick={resetForm}>Reset</button>
      </form>
    </div>
  );
}

ItemFormView.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

ItemFormView.defaultProps = {
  item: {},
};

export default ItemFormView;
