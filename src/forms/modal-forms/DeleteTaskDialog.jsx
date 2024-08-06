import React, { useState } from "react";

function DeleteTaskDialog() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div>
        <div className="title">Delete Task</div>
        <div className="body">
          <p>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
        </div>
        <div className="footer">
          <button className="primary">Cancel</button>
          <button className="secondary">Delete</button>
        </div>
      </div>
    </>
  );
}

export default DeleteTaskDialog;