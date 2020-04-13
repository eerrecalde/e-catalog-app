import { useState, useEffect, useReducer } from 'react';
import { API } from 'aws-amplify';

import { getItem, listItems } from '../graphql/queries';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinished: true,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinished: true,
        errorMsg: action.errorMsg,
      };
    default:
      throw new Error();
  }
};

const queries = {
  getItem,
  listItems,
};

export function useFetchData(initialConfig, initialData) {
  console.log('INSIDE FETCH');
  const [config] = useState(initialConfig);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    isFinished: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (!config.variables) {
        return;
      }
      dispatch({ type: 'FETCH_INIT' });
      try {
        if (!config.queryId) {
          throw new Error('Error');
        }
        const result = await API.graphql({
          query: queries[config.queryId],
          variables: config.variables || null,
          authMode: 'API_KEY',
        });
        if (!didCancel) {
          if (result.data[config.queryId]) {
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data[config.queryId] });
          } else {
            dispatch({ type: 'FETCH_FAILURE', errorMsg: 'Item not found' });
          }
          // cb({ isError: false, errorMsg: '', data: result.data[config.queryId] });
        }
      } catch (error) {
        if (!didCancel) {
          if (error.errors && error.errors[0] && error.errors[0].message) {
            console.log(error.errors[0].message.toString());
            dispatch({ type: 'FETCH_FAILURE', errorMsg: error.errors[0].message.toString() });
            // cb({ isError: true, errorMsg: error.errors[0].message.toString() });
          }
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [config]);
  return [state];
}

export default useFetchData;
