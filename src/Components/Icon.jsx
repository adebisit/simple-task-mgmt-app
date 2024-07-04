import React from "react";
import { Icon } from "@iconify/react";
import editIcon from "@iconify/icons-fa/edit";
import deleteIcon from "@iconify/icons-fa/trash";
import radioButtonOff from "@iconify/icons-ion/radio-button-off";
import radioButtonOn from "@iconify/icons-ion/radio-button-on";

const EditIcon = () => {
  return <Icon icon={editIcon} className="cursor-pointer" />;
};

const DeleteIcon = () => {
  return <Icon icon={deleteIcon} className="cursor-pointer" />;
};

const CustomRadioButton = ({ isIconChecked }) => {
  return <Icon icon={isIconChecked ? radioButtonOn : radioButtonOff} />;
};

export { EditIcon, DeleteIcon, CustomRadioButton };
