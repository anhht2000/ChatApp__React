import React from "react";

function MessageRight(props) {
  return (
    <div className="chat-content-rightside">
      <div className="d-flex ms-auto">
        <div className="flex-grow-1 me-2">
          <p className="mb-0 chat-time text-end">you, 2:37 PM</p>
          <p className="chat-right-msg">I am in USA</p>
        </div>
      </div>
    </div>
  );
}

export default MessageRight;
