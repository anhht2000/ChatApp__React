import React, { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import "reactstrap";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import useFileStore from "../../../hooks/useFileStore";
import Modal from "./customFields/Modal";
import { AppContext } from "../../../context/AppProvider";

function LeftChat(props) {
  const { handleSignOut } = useContext(AuthContext);
  const { rooms, handleSelect } = useContext(AppContext);
  const { data } = props;
  const { user, isShowPopup, handleShowPopup } = data;
  const [isShowRoom, SetIsShowRoom] = useState(false);
  //
  const toggle = () => {
    SetIsShowRoom(!isShowRoom);
  };
  //selectted
  const handleSelected = (roomId) => {
    handleSelect(roomId);
  };
  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar-header">
        <div className="d-flex align-items-center">
          <div className="chat-user-online">
            <img
              src={
                user.photoURL ||
                "https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg"
              }
              width={45}
              height={45}
              className="rounded-circle"
              alt={"ok"}
            />
          </div>
          <div className="flex-grow-1 ms-2">
            <p className="mb-0">{user.displayName}</p>
            <p className="mb-0 text-secondary">{user.email}</p>
          </div>
          <div className="dropdown">
            <div
              className="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-ellipsis-h" onClick={handleShowPopup}></i>
              {isShowPopup && <Popup handleSignOut={handleSignOut} />}
              {}
            </div>
          </div>
        </div>
        <div className="mb-3" />
        <div className="input-group input-group-sm">
          {" "}
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="People, groups, & messages"
          />{" "}
        </div>
        <div className="chat-tab-menu mt-3">
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="pill" href="/">
                <div className="font-24">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <small>Chats</small>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="pill" href="/">
                <div className="font-24">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <small>Calls</small>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="pill" href="/">
                <div className="font-24">
                  <i class="far fa-address-book"></i>
                </div>
                <div>
                  <small>Contacts</small>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="pill" href="/">
                <div className="font-24">
                  <i className="fas fa-bell"></i>
                </div>
                <div>
                  <small>Notifications</small>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="chat-sidebar-content">
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-Chats">
            <div className="ps-2">
              <Button
                color="tranparent"
                onClick={toggle}
                className="text-light"
                outline="none"
              >
                List Rooms
                <i
                  className="fas fa-chevron-down"
                  style={{ transform: "scale(0.5)" }}
                ></i>
              </Button>
              <Collapse isOpen={isShowRoom}>
                <div className="list__room">
                  {rooms.map((room, key) => {
                    return (
                      <div key={room.createAt}>
                        <Card
                          style={{ margin: "0", cursor: "pointer" }}
                          onClick={() => handleSelected(room.id)}
                        >
                          <CardBody>{room.name}</CardBody>
                        </Card>
                      </div>
                    );
                  })}
                </div>
                {<Modal buttonLabel="Add Rooms" uid={user.uid} />}
              </Collapse>
              <div className="dropdown">
                {" "}
                <p
                  className="text-uppercase text-secondary dropdown-toggle dropdown-toggle-nocaret m-0"
                  data-bs-toggle="dropdown"
                >
                  Recent Chats <i className="bx bxs-chevron-down" />
                </p>
              </div>
            </div>
            <div className="chat-list ps ps--active-y">
              <div className="list-group list-group-flush">
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/237/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Louis Litt</h6>
                      <p className="mb-0 chat-msg">
                        You just got LITT up, Mike.
                      </p>
                    </div>
                    <div className="chat-time">9:51 AM</div>
                  </div>
                </a>
                <a href="/" className="list-group-item active">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1023/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Harvey Specter</h6>
                      <p className="mb-0 chat-msg">
                        Wrong. You take the gun....
                      </p>
                    </div>
                    <div className="chat-time">4:32 PM</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1025/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Rachel Zane</h6>
                      <p className="mb-0 chat-msg">
                        I was thinking that we could...
                      </p>
                    </div>
                    <div className="chat-time">Wed</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1002/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Donna Paulsen</h6>
                      <p className="mb-0 chat-msg">Mike, I know everything!</p>
                    </div>
                    <div className="chat-time">Tue</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1010/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Jessica Pearson</h6>
                      <p className="mb-0 chat-msg">
                        Have you finished the draft...
                      </p>
                    </div>
                    <div className="chat-time">9/3/2020</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1013/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Harold Gunderson</h6>
                      <p className="mb-0 chat-msg">Thanks Mike! :)</p>
                    </div>
                    <div className="chat-time">12/3/2020</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/1018/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Katrina Bennett</h6>
                      <p className="mb-0 chat-msg">
                        I've sent you the files for...
                      </p>
                    </div>
                    <div className="chat-time">16/3/2020</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/237/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Charles Forstman</h6>
                      <p className="mb-0 chat-msg">Mike, this isn't over.</p>
                    </div>
                    <div className="chat-time">18/3/2020</div>
                  </div>
                </a>
                <a href="/" className="list-group-item">
                  <div className="d-flex">
                    <div className="chat-user-online">
                      <img
                        src="https://picsum.photos/id/237/200/300"
                        width={42}
                        height={42}
                        className="rounded-circle"
                        alt="not found"
                      />
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <h6 className="mb-0 chat-title">Jonathan Sidwell</h6>
                      <p className="mb-0 chat-msg">
                        That's bullshit. This deal..
                      </p>
                    </div>
                    <div className="chat-time">24/3/2020</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Popup(props) {
  const { setSelectedRoom, SelectedRoom } = useContext(AppContext);
  console.log(SelectedRoom);
  const { handleSignOut } = props;
  const popUpSignOut = () => {
    handleSignOut();
    setSelectedRoom({});
  };
  return (
    <div className="dropdown-menu dropdown-menu-end showPopup">
      {" "}
      <a className="dropdown-item" href="/">
        Settings
      </a>
      <div className="dropdown-divider" />{" "}
      <a className="dropdown-item" href="/">
        Help &amp; Feedback
      </a>
      <a className="dropdown-item" href="/">
        Enable Split View Mode
      </a>
      <a className="dropdown-item" href="/">
        Keyboard Shortcuts
      </a>
      <div className="dropdown-divider" />{" "}
      <span className="dropdown-item" onClick={popUpSignOut}>
        Sign Out
      </span>
    </div>
  );
}

export default LeftChat;
