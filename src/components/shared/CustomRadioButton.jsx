import React from "react";

const CustomRadioButton = ({ isChecked, outerSize = 32, innerSize = 16 }) => {
  return (
    <div
      className={
        "custom-radio-button relative flex items-center justify-center mr-4"
      }
      style={{ width: `${outerSize}px`, height: `${outerSize}px` }}
      role="button"
      tabIndex="0"
    >
      {isChecked && (
        <div
          className="inner-container"
          style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
        ></div>
      )}
    </div>
  );
};

export default CustomRadioButton;
