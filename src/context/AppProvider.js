import React, { useMemo, useState } from "react";
import { db } from "../firebase";
import addDatabase from "../firebase/services";
import useFileStore from "../hooks/useFileStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();
function AppProvider(props) {
  //state
  const [SearchUser, setSearchUser] = useState([]);
  const [SelectedRoom, setSelectedRoom] = useState({});
  //context
  const { user } = React.useContext(AuthContext);
  //get data users
  let users = useFileStore("users");

  console.log(SelectedRoom);
  //get data room
  const condiction = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);
  let rooms = useFileStore("rooms", condiction);
  //get user form search
  const HandleSearchUser = (searchInput) => {
    const searchArray = users.filter((user) => {
      return user.displayName.toLowerCase().includes(searchInput);
    });
    setSearchUser(searchArray);
  };
  //get message
  const condictionMessage = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: SelectedRoom.id,
    };
  }, [SelectedRoom.id]);
  const messages = useFileStore("messages", condictionMessage);

  //function handle select room
  const handleSelect = (roomId) => {
    const selectRoom = rooms.find((room) => {
      return room.id === roomId;
    });
    setSelectedRoom(selectRoom);
  };
  //add message
  const handleSubmitAddMessage = function (mess) {
    const message = {
      roomId: SelectedRoom.id,
      displayName: user.displayName,
      photoURL: user.photoURL,
      message: mess,
      uid: user.uid,
    };
    addDatabase("messages", message);
  };
  //get click search item
  const HandleClickItem = (user, selectedRoom) => {
    // update Rooms db
    const RoomsRef = db.collection("rooms").doc(SelectedRoom.id);
    RoomsRef.update({ members: [...selectedRoom.members, user.uid] });
    setSelectedRoom({
      ...selectedRoom,
      members: [...selectedRoom.members, user.uid],
    });
  };
  return (
    <AppContext.Provider
      value={{
        rooms,
        messages,
        handleSubmitAddMessage,
        handleSelect,
        SelectedRoom,
        setSelectedRoom,
        SearchUser,
        handleClickItem: HandleClickItem,
        handleSearchUser: HandleSearchUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
