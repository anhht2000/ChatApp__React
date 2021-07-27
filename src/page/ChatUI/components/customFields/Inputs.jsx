import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

function Inputs(props) {
  const { field, form, type, label, placeholder, disable } = props; //field va form va formik tu dong truyen
  const { name, value, onBlur, onChange } = field;
  return (
    <div>
      <FormGroup>
        {label && <Label for={name}>{label}</Label>}

        <Input type={type} id={name} {...field} placeholder={placeholder} />
      </FormGroup>
    </div>
  );
}

export default Inputs;
