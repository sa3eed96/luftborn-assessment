import React, { useState, useRef } from "react";
import { useField } from "formik";
import "./PasswordInput.css";

const PasswordInput = ({ label, placeholder, passRegex, test, ...props }) => {
  const [strength, setStrength] = useState(0);
  const [strengthMsg, setStrengthMsg] = useState("");
  const [type, setType] = useState("password");
  const inpRef = useRef();

  let validatePassword = function (value = "") {
    const regex = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "g"
    );
    const strongRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{11,}$/,
      "g"
    );
    if (value.length === 0) setStrength(0);
    else if (!regex.test(value)) {
      setStrength(1);
      if (!/[@$!%*#?&]/.test(value)) setStrengthMsg("Add symbols");
      else if (!/[a-zA-Z]/.test(value)) setStrengthMsg("Add letters");
      else if (!/\d/.test(value)) setStrengthMsg("Add Numbers");
      else if (value.length < 8) setStrengthMsg("Must be 8 characters");
      else setStrengthMsg("");
    } else if (value.length >= 16 || strongRegex.test(value)) {
      setStrength(3);
      setStrengthMsg("");
    } else {
      setStrengthMsg("");
      setStrength(2);
    }
    return false;
  };

  if (test !== true)
    //don't test password strength
    validatePassword = null;
  const [field, meta] = useField({ ...props, validate: validatePassword });

  const isValid = meta.touched && typeof meta.error === "undefined";
  let className = "customInput";
  if (!isValid && meta.touched) className += " error";
  const revealPassword = () => {
    inpRef.current.focus();
    if (type === "password") {
      setType("text");
      return;
    }
    setType("password");
  };
  return (
    <div className="inputControl">
      <div className="inputLabel">
        <label htmlFor={props.id || props.name}>{label}</label>
        <div>
          {isValid && (
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
          {!isValid && meta.touched && (
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
      </div>

      <input
        ref={inpRef}
        type={type}
        placeholder={placeholder}
        className={className + " password"}
        {...field}
        {...props}
      />
      {field.value.length > 0 && (
        <span onClick={revealPassword} className="passShowIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="14"
            viewBox="0 0 24 14"
          >
            <path
              fill="#007c89"
              d="M12.015,7c4.751,0,8.063,3.012,9.5,4.636-1.4,1.837-4.713,5.364-9.5,5.364-4.42,0-7.93-3.536-9.478-5.407C4.03,9.946,7.354,7,12.015,7Zm0-2C4.446,5,0,11.551,0,11.551S4.835,19,12.015,19C19.748,19,24,11.551,24,11.551S19.709,5,12.015,5ZM12,10a2,2,0,1,1-2,2A2,2,0,0,1,12,10Zm0-2a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"
              transform="translate(0 -5)"
            />
          </svg>
        </span>
      )}
      {strength > 0 && (
        <div className="passStrength">
          {strength === 1 && (
            <>
              <span className="passwordHint">{strengthMsg}</span>
              <span className="redText">{"Weak"}</span>
            </>
          )}
          {strength === 2 && (
            <>
              <span className="passwordHint">{strengthMsg}</span>
              <span className="greenText">{"Moderate"}</span>
            </>
          )}
          {strength === 3 && (
            <>
              <span className="passwordHint">{strengthMsg}</span>
              <span className="greenText">{"Strong"}</span>
            </>
          )}
        </div>
      )}
      <div className="inputFooter">
        <p className="errorText">{meta.touched && meta.error && meta.error}</p>
      </div>
    </div>
  );
};

export default PasswordInput;
