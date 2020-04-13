import { useReducer, useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem, updateItem, deleteItem } from '../graphql/mutations';

const dataMutateReducer = (state, action) => {
  switch (action.type) {
    case 'MUTATE_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'MUTATE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'MUTATE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.errorMsg,
      };
    default:
      throw new Error();
  }
};

const queries = {
  createItem,
  deleteItem,
  updateItem,
};

export function useMutateData(initialQueryId) {
  console.log('INSIDE MUTATE');
  const [state, dispatch] = useReducer(dataMutateReducer, {
    isLoading: false,
    isError: false,
    data: null,
  });
  const [queryId] = useState(initialQueryId);
  const [queryInput, setQueryInput] = useState();

  useEffect(() => {
    async function mutateData() {
      console.log('MutateData!', queryId, queries[queryId], queryInput);
      dispatch({ type: 'MUTATE_INIT' });
      try {
        const result = await API.graphql(graphqlOperation(queries[queryId], { input: queryInput }));
        dispatch({ type: 'MUTATE_SUCCESS', payload: result.data[queryId] });
        console.log(result);
        // cb({ isError: false, errorMsg: '' });
      } catch (error) {
        console.log('>>>>', error);
        if (error.errors && error.errors[0] && error.errors[0].message) {
          console.log(error.errors[0].message.toString());
          dispatch({ type: 'MUTATE_FAILURE', errorMsg: error.errors[0].message.toString() });
          // cb({ isError: true, errorMsg: error.errors[0].message.toString() });
        } else {
          dispatch({ type: 'MUTATE_FAILURE', errorMsg: error.toString() });
        }
        // cb({ isError: true, errorMsg: error.toString() });
      }
    }

    if (queryId && queryInput !== undefined) {
      mutateData();
    }
  }, [queryId, queryInput]);

  return [state, setQueryInput];
}

export default useMutateData;
