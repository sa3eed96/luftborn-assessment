import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Login.css";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import SubmitButton from "../common/SubmitButton";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
import ToastBody from "../common/ToastBody";

const Login = (props) => {
  const { user, setUser } = useContext(UserContext);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is a required field"),
    password: Yup.string().required("Password is a required field"),
  });

  const handleSubmit = async (values) => {
    const res = await fetch(`/identity/login`, {
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
    if (data.login == false) {
      toast(<ToastBody text={"Invalid email or password"} />, {
        className: "errorToast",
      });
      return;
    }
    setUser({
      isAuthenticated: true,
      name: data.name,
      email: data.email,
    });
    history.push("/");
  };

  return (
    <div className="login">
      <div className="card">
        <div className="form">
          <h1>Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <TextInput
                  placeholder="Enter your email"
                  label="Email"
                  name={"email"}
                  autoComplete="off"
                  showicon={true}
                />
                <PasswordInput
                  test={false}
                  name={"password"}
                  label="Password"
                  placeholder="Enter Password"
                />
                <SubmitButton
                  btnType={formik.isSubmitting ? "loading" : "main"}
                  text={
                    formik.isSubmitting
                      ? "Logging in"
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
        <div className="signup">
          <span>Or Sign Up Using</span>
          <Link to="/signup">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
