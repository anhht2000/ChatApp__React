import { formatRelative } from "date-fns";
import React from "react";

function MessageLeft(props) {
  const { datamess } = props;
  if (datamess.createdAt) {
    console.log(datamess.createdAt.seconds);
  } else {
    console.log("none");
  }
  function convert(ts) {
    let formatedDate = "";
    if (ts) {
      formatedDate = formatRelative(new Date(ts * 1000), new Date());
      formatedDate =
        formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
    }
    return formatedDate;
  }
  if (Object.keys(datamess).length > 4) {
    return (
      // <></>
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
              {datamess.createdAt
                ? datamess.displayName +
                  " :  " +
                  convert(datamess.createdAt.seconds)
                : "ok"}
            </p>
            <p className="chat-left-msg">{datamess.message}</p>
          </div>
        </div>
      </div>
    );
  } else return <></>;
}

export default MessageLeft;
