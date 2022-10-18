import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../common/TextInput";
import SubmitButton from "../common/SubmitButton";
import { toast } from "react-toastify";
import ToastBody from "../common/ToastBody";
import "./Update.css";

const Update = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const state = location.state;

  const schema = Yup.object().shape({
    name: Yup.string().required("Todo item description is a required field"),
    day: Yup.string().required("Date is a required field"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    let res;
    if (Object.keys(state).length > 0) {
      res = await fetch(`/todoitems/update`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      res = await fetch(`/todoitems/create`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
    }
    if (!res.ok) {
      toast(
        <ToastBody text={"An error has occurred, please try again later"} />,
        {
          className: "errorToast",
        }
      );
      setIsLoading(false);
      return;
    }
    toast(<ToastBody text={"successful opeartion"} />, {
      className: "defaultToast",
    });
    history.replace("/");
  };
  return (
    <div className="update">
      <div className="card">
        <h1>
          {Object.keys(state).length > 0 ? "Edit item" : "Create new item"}
        </h1>
        <Formik
          initialValues={
            Object.keys(state).length > 0
              ? {
                  id: state.id,
                  name: state.name,
                  day: new Date(state.day).toISOString().split("T")[0],
                }
              : { name: "", day: "" }
          }
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className="inputs">
                <label className="label">Todo item description</label>
                <Field
                  name="name"
                  component="textarea"
                  rows="4"
                  placeholder="Enter your item"
                  type="text"
                />
                {formik.errors.name && formik.errors.name.length > 0 && (
                  <p className="errorText">{formik.errors.name}</p>
                )}
                <TextInput
                  type="date"
                  placeholder=""
                  label="Date"
                  name={"day"}
                  autoComplete="off"
                  showicon={true}
                />
              </div>
              <div className="btns">
                <SubmitButton
                  btnType={
                    formik.isSubmitting || isLoading ? "loading" : "main"
                  }
                  text={
                    formik.isSubmitting || isLoading
                      ? Object.keys(state).length > 0
                        ? "Updating todo item"
                        : "Adding todo item"
                      : Object.keys(state).length > 0
                      ? "Edit todo item"
                      : "Add todo item"
                  }
                  type="submit"
                  onClick={null}
                  disabled={!(formik.isValid && formik.dirty)}
                />
                <button
                  type="button"
                  onClick={() => {
                    formik.setErrors({});
                    history.replace("");
                  }}
                >
                  <a>Cancel</a>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Update;
