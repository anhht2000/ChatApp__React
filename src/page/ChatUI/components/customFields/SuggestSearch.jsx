import React, { useContext } from "react";
import { AppContext } from "../../../../context/AppProvider";

function SuggestSearch(props) {
  const { user, toggle } = props;
  const { handleClickItem, SelectedRoom } = useContext(AppContext);
  const selectedRoom = SelectedRoom;
  const handleEventClick = (user, selectedRoom) => {
    toggle();
    handleClickItem(user, selectedRoom);
  };
  return (
    <li
      className="suggest__search-item"
      onClick={() => handleEventClick(user, selectedRoom)}
    >
      <p className="user-info__container">
        <img
          src={
            user.photoURL ||
            "https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg"
          }
          alt=""
          className="user-info__container__img"
        />
        <p className="user-info__container__text">{user.displayName}</p>
      </p>
    </li>
  );
}

export default SuggestSearch;
