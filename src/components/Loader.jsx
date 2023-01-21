import React from "react";
import { Dna } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loader = (props) => {
  const { isLoading } = props;
  
  return isLoading ? (
    <div className="grid fixed h-full min-w-full items-center justify-items-center z-[1000] bg-blue-100 bg-opacity-20 backdrop-blur-sm drop-shadow-lg">
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperclassName="z-100 dna-wrapper"
      />
    </div>
  ) : null;
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
