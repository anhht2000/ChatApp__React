import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { AppContext } from "../../../../context/AppProvider";
import SuggestSearch from "./SuggestSearch";

const ModalExample = (props) => {
  const { SearchUser } = React.useContext(AppContext);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <span
        className="translate"
        style={{ cursor: "pointer" }}
        onClick={toggle}
      >
        <i className="fas fa-user-plus"></i>
      </span>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Room</ModalHeader>
        <ModalBody style={{ position: "relative" }}>
          <SearchForm id="search__form" />
          <ul className="suggest__search">
            {SearchUser.map((user) => {
              return (
                <SuggestSearch user={user} key={user.uid} toggle={toggle} />
              );
            })}
          </ul>
        </ModalBody>
      </Modal>
    </div>
  );
};

function SearchForm(props) {
  const { handleSearchUser, SearchUser } = useContext(AppContext);
  const [SearchValue, setSearchValue] = useState("");
  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    //ky thuat debound
    const debound = setTimeout(() => {
      handleSearchUser(SearchValue);
    }, 300);
    return () => {
      clearTimeout(debound);
    };
  }, [SearchValue]);

  return (
    <Form>
      <FormGroup>
        <Label for="examplePassword">Search</Label>
        <Input
          type="text"
          name="search"
          id="examplePassword"
          onChange={handleInput}
          placeholder="typing into search"
        />
      </FormGroup>
    </Form>
  );
}
export default ModalExample;
