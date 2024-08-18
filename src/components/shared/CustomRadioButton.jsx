import React, { useState } from "react";

const CustomRadioButton = ({ outerSize = 32, innerSize = 16 }) => {
  const [isIconChecked, setIsIconChecked] = useState(false);

  const handleIconClick = () => {
    setIsIconChecked(!isIconChecked);
  };

  const onKeyDown = (event) => {
    event.preventDefault();

    if (event.key === "Enter" || event.key === " ") {
      handleIconClick();
    }
  };
  return (
    <div
      className={
        "custom-radio-button relative flex items-center justify-center mr-4"
      }
      style={{ width: `${outerSize}px`, height: `${outerSize}px` }}
      role="button"
      onClick={handleIconClick}
      tabIndex="0"
      onKeyDown={onKeyDown}
    >
      {isIconChecked && (
        <div
          className="inner-container"
          style={{ width: `${innerSize}px`, height: `${innerSize}px` }}
        ></div>
      )}
    </div>
  );
};

export default CustomRadioButton;
