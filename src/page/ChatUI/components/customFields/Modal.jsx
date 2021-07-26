import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import addDatabase from "../../../../firebase/services";
import { v4 as uuidv4 } from "uuid";
import Forms from "./Form";

const ModalExample = (props) => {
  //xu ly them du lieu vao filestore
  const addDataRoom = (data) => {
    console.log(data);
    const newData = { ...data, members: [uid] };
    addDatabase("rooms", newData);
  };
  const { buttonLabel, className, uid } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color="danger"
        onClick={toggle}
        className="bg-transparent border-primary btn-outline-primary text-light mt-2"
      >
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Room</ModalHeader>
        <ModalBody>
          {<Forms toggle={toggle} addDataRoom={addDataRoom} />}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default ModalExample;
