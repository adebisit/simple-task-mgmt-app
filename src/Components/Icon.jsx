import React from "react";
import { Icon } from "@iconify/react";
import editIcon from "@iconify/icons-fa/edit";
import deleteIcon from "@iconify/icons-fa/trash";
import radioButtonOff from "@iconify/icons-ion/radio-button-off";
import radioButtonOn from "@iconify/icons-ion/radio-button-on";
import plusLight from "@iconify-icons/ph/plus-light";
import funnelOutline from "@iconify/icons-ion/funnel-outline";

const EditIcon = () => <Icon icon={editIcon} className="cursor-pointer" />;

const DeleteIcon = () => (
  <Icon icon={deleteIcon} className="text-red-600 cursor-pointer" />
);

const CustomRadioButton = ({ isIconChecked }) => {
  return <Icon icon={isIconChecked ? radioButtonOn : radioButtonOff} />;
};

const PlusIcon = () => <Icon icon={plusLight} height="50" width="50" />;

const FilterIcon = () => {
  return (
    <div className="bg-gray-300 p-2 rounded-lg items-center justify-center cursor-pointer">
      <Icon icon={funnelOutline} height="20" width="20" />
    </div>
  );
};

const SortIcon = () => {
  return (
    <div className="bg-gray-300 p-2 rounded-lg items-center justify-center cursor-pointer">
      <Icon icon="ic:sharp-keyboard-double-arrow-down" height="20" width="20" />
    </div>
  );
};

export {
  EditIcon,
  DeleteIcon,
  CustomRadioButton,
  PlusIcon,
  FilterIcon,
  SortIcon,
};
