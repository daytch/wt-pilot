import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const ErrorMessage = (title, message) => {
  return MySwal.fire({
    title: title ? title : <strong>Failed!</strong>,
    html: message,
    icon: "error",
  });
};

export const SuccessMessage = (title, message) => {
  return MySwal.fire({
    title: title ? title : <strong>Success!</strong>,
    html: message,
    icon: "success",
  });
};

export const ConfirmationMessage = (title, message) => {
    return MySwal.fire({
      title: title ? title : <strong>Confirmation?</strong>,
      html: message,
      icon: "question",
    });
  };
  
export const InfoMessage = (title, error) => {
  return MySwal.fire({
    title: title ? title : <strong>Failed!</strong>,
    html: error,
    icon: "error",
  });
};
