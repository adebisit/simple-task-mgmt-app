import React, { useState } from "react";
import { CloseIcon } from "../components/Icon";

export default function Modal({
  setIsOpen,
  title,
  contentFn,
  primaryBtnTxt,
  secondaryBtnTxt,
  loadingComp,
  onSave,
  onCancel,
  onModalClose,
  requiresValidation
}) {
  const [formData, setFormData] = useState(null);
  const [processingModal, setProcessingModal] = useState(false);
  
  const handleSave = async () => {
    if (requiresValidation && formData && Object.values(formData).some((value) => value.trim() === "")) {
        alert("Input fields should not be empty");
        return
    }

    if (onSave) {
      setProcessingModal(true);
      const resp = await onSave(formData);
      console.log("Response ")
      console.log(resp)
      setProcessingModal(false);
      setIsOpen(false);
      onModalClose(resp)
    }
  };

  const onClose = () => {
    onCancel();
    setIsOpen(false);
  };

  const modalFormComp = contentFn({ setParentModalFormData: setFormData });

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full ">
          <div className="px-6 pt-5 pb-4 sm:p-8 sm:pb-6">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full flex justify-between">
              <div className="title text-2xl leading-6 pb-6 font-medium text-gray-500 w-full flex justify">
                {title}
              </div>
              <button onClick={onClose} className="ml-4 pb-6">
                <CloseIcon />
              </button>
            </div>
            <div className="border-b border-black w-full mb-4"></div>
            <div className="body border-b border-black mb-10">
              {modalFormComp}
            </div>

            <div className="footer flex justify-end">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center hover:bg-gray-800 rounded-md border border-gray-300 px-8 py-2 text-lg text-white bg-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-lg"
                onClick={onClose}
              >
                {secondaryBtnTxt}
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border hover:bg-blue-700 px-8 py-2 bg-blue-500 text-lg text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-lg"
                onClick={handleSave}
                disabled={processingModal}
              >
                {processingModal ? loadingComp : primaryBtnTxt}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
