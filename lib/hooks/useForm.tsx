import { useReducer } from 'react';

const reducer = (state, updateObject) => {
  return { ...state, ...updateObject };
};

const useForm = (defaultProperties) => {
  const [props, dispatch] = useReducer(reducer, defaultProperties);

  const handleFieldChange = (key, event) => {
    dispatch({ [key]: event.target.value });
  };

  return [props, dispatch, handleFieldChange];
};

export default useForm;
