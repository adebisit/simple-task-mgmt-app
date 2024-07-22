import React from "react";

const EditIcon = () => {
  return (
    <button>
      <svg
        width="24"
        height="29"
        viewBox="0 0 24 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 4.83333H4C3.46957 4.83333 2.96086 5.08795 2.58579 5.54116C2.21071 5.99437 2 6.60906 2 7.25V24.1667C2 24.8076 2.21071 25.4223 2.58579 25.8755C2.96086 26.3287 3.46957 26.5833 4 26.5833H18C18.5304 26.5833 19.0391 26.3287 19.4142 25.8755C19.7893 25.4223 20 24.8076 20 24.1667V15.7083M18.5 3.02084C18.8978 2.54013 19.4374 2.27007 20 2.27007C20.5626 2.27007 21.1022 2.54013 21.5 3.02084C21.8978 3.50154 22.1213 4.15352 22.1213 4.83333C22.1213 5.51315 21.8978 6.16513 21.5 6.64584L12 18.125L8 19.3333L9 14.5L18.5 3.02084Z"
          stroke="#101828"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

const DeleteIcon = () => {
  return (
    <button>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6H5ZM8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17"
          stroke="#CE001C"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};

// const CustomRadioButton = ({ isIconChecked }) => {
//   return <Icon icon={isIconChecked ? radioButtonOn : radioButtonOff} />;
// };
//const PlusIcon = () => <Icon icon={plusLight} height="50" width="50" />;

const FilterIcon = () => {
  return (
    <button>
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="35" height="35" rx="10" fill="#D9D9D9" />
        <path
          d="M25 11H10L16 18.095V23L19 24.5V18.095L25 11Z"
          stroke="#101828"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};
const SortIcon = () => {
  return (
    <button>
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="35" height="35" rx="10" fill="#D9D9D9" />
        <path
          d="M13 17.8333L18 22L23 17.8333M13 12L18 16.1667L23 12"
          stroke="#101828"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
};
export { EditIcon, DeleteIcon, FilterIcon, SortIcon };
