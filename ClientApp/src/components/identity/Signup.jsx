import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Signup.css";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import SubmitButton from "../common/SubmitButton";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
import ToastBody from "../common/ToastBody";

const Signup = (props) => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();
  Yup.addMethod(Yup.mixed, "isAMatch", function (ref, msg) {
    return this.test({
      name: "ConfirmPassword",
      message: msg || "Confirm password must be the same as ${reference}",
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  });

  const schema = Yup.object().shape({
    FirstName: Yup.string().required("First name is required"),
    LastName: Yup.string().required("Last name is required"),
    Email: Yup.string()
      .email("Invalid email")
      .required("Email is a required field"),
    Password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "password must contain at least 1 letter, 1 number and 1 symbol"
      )
      .required("Password is a required field"),
    ConfirmPassword: Yup.string()
      .required("Confirm password is a required field")
      .isAMatch(Yup.ref("Password")),
  });

  const handleSubmit = async (values) => {
    const res = await fetch(`/identity/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!res.ok) {
      toast(
        <ToastBody text={"An error has occurred, please try again later"} />,
        {
          className: "errorToast",
        }
      );
      return;
    }
    const data = await res.json();
    setUser({
      isAuthenticated: true,
      name: data.name,
      email: data.email,
    });
    history.push("/");
  };

  return (
    <div className="signup">
      <div className="card">
        <h1>Sign up</h1>
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className="formInputs">
                <div className="name">
                  <TextInput
                    label="First Name"
                    name="FirstName"
                    placeholder="Enter first name"
                    showicon={false}
                  />
                  <TextInput
                    label="Last Name"
                    name="LastName"
                    placeholder="Enter last name"
                    showicon={true}
                  />
                </div>
                <TextInput
                  placeholder="Enter your email"
                  label="Email"
                  name={"Email"}
                  autoComplete="off"
                  showicon={true}
                />
                <PasswordInput
                  test={true}
                  name={"Password"}
                  label="Password"
                  placeholder="Enter Password"
                />
                <TextInput
                  placeholder="Re-enter your password"
                  label="Confirm password"
                  name={"ConfirmPassword"}
                  autoComplete="off"
                  showicon={true}
                />
              </div>
              <SubmitButton
                btnType={formik.isSubmitting ? "loading" : "main"}
                text={
                  formik.isSubmitting
                    ? "Signing up"
                    : "Enter email and password to login"
                }
                type="submit"
                onClick={null}
                disabled={!(formik.isValid && formik.dirty)}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
