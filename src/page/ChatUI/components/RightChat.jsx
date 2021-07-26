import React, { useContext, useMemo, useState } from "react";
import ReactTooltip from "react-tooltip";
import { AppContext } from "../../../context/AppProvider";
import useFileStore from "../../../hooks/useFileStore";
import ModalInvite from "./customFields/ModalInvite";
import MessageLeft from "./MessageLeft";

function RightChat(props) {
  //context
  const { SelectedRoom, handleSubmitAddMessage, messages } =
    useContext(AppContext);
  const [inputValue, setinputValue] = useState("");
  const condictionUser = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: SelectedRoom.members,
    };
  }, [SelectedRoom.members]);
  const users = useFileStore("users", condictionUser);
  //handle
  const handleChangeInput = (e) => {
    setinputValue(e.target.value);
  };
  const handleSubmit = (mess) => {
    handleSubmitAddMessage(mess);
    setinputValue("");
  };
  //
  const handleOnEnter = (e, mess) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
      handleSubmitAddMessage(mess);
      setinputValue("");
    }
  };
  if (Object.keys(SelectedRoom).length > 0)
    return (
      <div>
        <div className="chat-header d-flex align-items-center">
          <div className="chat-toggle-btn">
            <i className="bx bx-menu-alt='not found'-left" />
          </div>
          <div>
            <h4 className="mb-1 font-weight-bold">{SelectedRoom.name}</h4>
            <div className="list-inline d-sm-flex mb-0 d-none">
              {" "}
              <a
                href="/"
                className="list-inline-item d-flex align-items-center text-secondary "
              >
                <i className="fas fa-dot-circle dot-active"></i>
                Active Now
              </a>
            </div>
          </div>
          <div className="chat-top-header-menu ms-auto">
            {" "}
            <ModalInvite />
            <span className="translate" data-tip data-for="user1">
              <img
                src={
                  users.length > 0
                    ? users[0].photoURL
                    : "https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg"
                }
                alt="no"
                className="img-display"
              />
            </span>
            <ReactTooltip id="user1" place="bottom" effect="solid" type="info">
              {users[0] && users[0].displayName}
            </ReactTooltip>
            {users.length >= 2 ? (
              <div style={{ display: "inline-flex" }}>
                <span className="translate" data-tip data-for="user2">
                  <img
                    src={
                      users.length >= 1
                        ? users[1].photoURL
                        : "https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg"
                    }
                    alt="no"
                    className="img-display"
                  />
                </span>
                <ReactTooltip
                  id="user2"
                  place="bottom"
                  effect="solid"
                  type="info"
                >
                  {users[1] && users[1].displayName}
                </ReactTooltip>
                <span className="translate">{`+${users.length - 2}`}</span>
              </div>
            ) : (
              <span className="translate">{`+${users.length - 1}`}</span>
            )}
          </div>
        </div>
        <div
          className="chat-content ps ps--active-y"
          style={{ overflowY: "scroll" }}
        >
          {/* MESSAGE  */}
          {messages.map((mess) => {
            return <MessageLeft datamess={mess} keys={mess.id} />;
          })}
        </div>
        <div className="chat-footer d-flex align-items-center">
          <div className="flex-grow-1 pe-2">
            <div className="input-group">
              {" "}
              <input
                type="text"
                className="form-control"
                placeholder="Type a message"
                onChange={handleChangeInput}
                onKeyPress={(e) => handleOnEnter(e, inputValue)}
                value={inputValue}
              />
              <span
                className="input-group-text"
                onClick={() => handleSubmit(inputValue)}
              >
                <i className="fas fa-paper-plane"></i>
              </span>
            </div>
          </div>
          <div className="chat-footer-menu">
            {" "}
            <a href="/">
              <i className="fas fa-file"></i>
            </a>
            <a href="/">
              <i className="fas fa-id-card-alt"></i>
            </a>
            <a href="/">
              <i className="fas fa-microphone"></i>
            </a>
            <a href="/">
              <i className="fas fa-ellipsis-h"></i>
            </a>
          </div>
        </div>
        {/*start chat overlay*/}
        <div className="overlay chat-toggle-btn-mobile" />
        {/*end chat overlay*/}
      </div>
    );
  else
    return (
      <div className="chat-header d-flex align-items-center">
        Please Select Room To Send Message
      </div>
    );
}

export default RightChat;
