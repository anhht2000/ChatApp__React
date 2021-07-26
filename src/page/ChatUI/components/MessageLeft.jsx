import React from "react";
import { formatRelative } from "date-fns";

function MessageLeft(props) {
  const { datamess } = props;
  function convert(ts) {
    let formatedDate = "";
    if (ts) {
      formatedDate = formatRelative(new Date(ts * 1000), new Date());
      formatedDate =
        formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
    }
    return formatedDate;
  }
  return (
    <div className="chat-content-leftside">
      <div className="d-flex">
        <img
          src={datamess.photoURL}
          width={48}
          height={48}
          className="rounded-circle"
          alt="not found"
        />
        <div className="flex-grow-1 ms-2">
          <p className="mb-0 chat-time">
            {datamess.displayName +
              " :  " +
              convert(datamess.createdAt.seconds)}
          </p>
          <p className="chat-left-msg">{datamess.message}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageLeft;
