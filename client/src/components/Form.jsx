import React from "react";
import useFormState from "../hooks/useFormState";

const Form = ({ getResult, placeholder }) => {
  const [value, handleChange, handleReset] = useFormState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    getResult(value);
    handleReset();
  };

  return (
    <form className="mx-auto my-2" onSubmit={handleFormSubmit}>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className="col-12 col-md-2 form-control"
        placeholder={placeholder}
      ></input>
    </form>
  );
};

export default Form;
