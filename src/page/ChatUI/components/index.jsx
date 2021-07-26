import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import "../asset/css/index.scss";
import LeftChat from "./LeftChat";
import RightChat from "./RightChat";

function Index(props) {
  const context = useContext(AuthContext);
  const { user } = context;
  //state
  const [isShowPopup, setIsShowPopup] = useState(false);
  //handle event
  const handleShowPopup = () => {
    setIsShowPopup(!isShowPopup);
  };
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="chat-wrapper">
          {<LeftChat data={{ user, isShowPopup, handleShowPopup }} />}
          {<RightChat />}
        </div>
      </div>
    </div>
  );
}

export default Index;
