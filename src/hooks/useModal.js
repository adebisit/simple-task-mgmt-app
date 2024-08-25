import React, { useState } from "react";
import Modal from "../modals/Modal";

export function useModal({
  title,
  contentFn = () => {},
  primaryBtnTxt,
  secondaryBtnTxt,
  loadingComp,
  onSave,
  onCancel,
  requiresValidation = false
}) {
  const [isOpen, setIsOpen] = useState(false);

  const modal = isOpen ? (
    <Modal
      setIsOpen={setIsOpen}
      title={title}
      contentFn={contentFn}
      primaryBtnTxt={primaryBtnTxt}
      secondaryBtnTxt={secondaryBtnTxt}
      loadingComp={loadingComp}
      onSave={onSave}
      onCancel={onCancel}
      requiresValidation={requiresValidation}
    />
  ) : (
    <></>
  );

  return { modal, setIsOpen };
}
