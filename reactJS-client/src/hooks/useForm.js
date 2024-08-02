import { useState, useEffect } from "react";

export function useForm(initialValues, submitCallback) {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const arrayChangeHandler = (index, name, value) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: prevState[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (name) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], ""],
    }));
  };

  const removeArrayItem = (index, name) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((_, i) => i !== index),
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submitCallback(values);
  };

  return {
    values,
    setValues,
    changeHandler,
    arrayChangeHandler,
    addArrayItem,
    removeArrayItem,
    submitHandler,
  };
}
