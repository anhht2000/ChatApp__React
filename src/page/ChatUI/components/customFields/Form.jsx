import React from "react";
import { Formik, Form, FastField } from "formik";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import Inputs from "./Inputs";

function Forms(props) {
  const { toggle, addDataRoom } = props;
  const handleSubmit = (data) => {
    toggle();
    //xu ly them
    addDataRoom(data);
  };
  const handleCancel = () => {
    console.log("submit ok");
    toggle();
  };
  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form>
            <FastField
              name="name"
              component={Inputs}
              //
              label="Room Name"
              placeholder="Please enter name's room"
            />
            <FastField
              name="description"
              component={Inputs}
              //
              label="Description"
              placeholder="Please enter description's room"
            />
            <Button
              className="mt-2 bg-primary "
              onClick={() => handleSubmit(values)}
            >
              Add Room
            </Button>
            <Button className="mt-2 bg-secondary ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Forms;
