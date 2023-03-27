import React from "react";

function InputField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;