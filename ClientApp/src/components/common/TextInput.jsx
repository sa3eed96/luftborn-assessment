import React from "react";
import { useField } from "formik";
import "./TextInput.css";

const TextInput = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const isValid = meta.touched && typeof meta.error == "undefined";
  let className = "customInput";
  if (!isValid && meta.touched) className += " error";
  return (
    <div className="inputControl">
      <div
        className={
          props.disabled === true ? "inputLabel disabled" : "inputLabel"
        }
      >
        <label htmlFor={props.id || props.name}>{label}</label>
        {props.showicon && (
          <div>
            {isValid && !(props.errormsg && props.errormsg.length > 0) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.49"
                height="17.49"
                viewBox="0 0 17.49 17.49"
              >
                <path
                  d="M8.745,1.457A7.287,7.287,0,1,1,1.457,8.745,7.3,7.3,0,0,1,8.745,1.457ZM8.745,0A8.745,8.745,0,1,0,17.49,8.745,8.745,8.745,0,0,0,8.745,0ZM7.317,12.389,4.038,9.241,5.055,8.2,7.3,10.336,12.416,5.1l1.036,1.027L7.317,12.389Z"
                  fill="#12aa3b"
                />
              </svg>
            )}
            {((!isValid && meta.touched) ||
              (props.errormsg && props.errormsg.length > 0)) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.49"
                height="17.49"
                viewBox="0 0 17.49 17.49"
              >
                <path
                  d="M8.745,1.457A7.287,7.287,0,1,1,1.457,8.745,7.3,7.3,0,0,1,8.745,1.457ZM8.745,0A8.745,8.745,0,1,0,17.49,8.745,8.745,8.745,0,0,0,8.745,0Zm.729,13.117H8.016V7.287H9.474ZM8.745,4.19a.911.911,0,1,1-.911.911A.911.911,0,0,1,8.745,4.19Z"
                  fill="#E92121"
                />
              </svg>
            )}
            {!isValid && !meta.touched && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.49"
                height="17.49"
                viewBox="0 0 17.49 17.49"
              >
                <path
                  d="M8.745,1.457A7.287,7.287,0,1,1,1.457,8.745,7.3,7.3,0,0,1,8.745,1.457ZM8.745,0A8.745,8.745,0,1,0,17.49,8.745,8.745,8.745,0,0,0,8.745,0Zm.729,13.117H8.016V7.287H9.474ZM8.745,4.19a.911.911,0,1,1-.911.911A.911.911,0,0,1,8.745,4.19Z"
                  fill="#787573"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      <input
        placeholder={placeholder}
        className={className}
        {...field}
        {...props}
      />
      <div className="inputFooter">
        <p className="errorText">
          {(meta.touched && meta.error && meta.error) ||
            (props.errormsg && props.errormsg.length > 0 && props.errormsg)}
        </p>
      </div>
    </div>
  );
};

export default TextInput;
