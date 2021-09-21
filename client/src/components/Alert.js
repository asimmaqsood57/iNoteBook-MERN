import React from "react";

function Alert(props) {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        {props.message} This is a message
      </div>
    </div>
  );
}

export default Alert;
