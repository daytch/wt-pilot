/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

function Select(props) {
  const { value, options, onChange, ref } = props;
  // console.log("options:", options)
  return (
    <select
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="py-1 px-3 w-128 pr-6 block w-full disabled:bg-gray-300 bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    >
      {options &&
        options.map((x, idx) => (
          <option key={idx} value={x.MemberValue}>
            {x.DisplayValue}
          </option>
        ))}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default Select;
