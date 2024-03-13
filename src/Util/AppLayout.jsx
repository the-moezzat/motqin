import React, { useEffect, useState } from "react";

import { FaSignOutAlt } from "react-icons/fa";

import { Outlet, useLocation, useParams } from "react-router-dom";

import "./Applayout.css";


const AppLayout = ({ chats, setChats, showChat, setShowChat }) => {

 
  return (
    <div className="overflow-x-hidden       ">
      <div>
        <div>
          <main >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

// !sideBar ? (
//   <Sidebar
//     setOpenSideBar={setOpenSideBar}
//     openSideBar={openSideBar}
//   />
// ) : switchSideBar ? (
//   <ChatSideBar
//     switchIcon="switchicon"
//     switchSideBar={switchSideBar}
//     chats={chats}
//     setChats={setChats}
//     showChat={showChat}
//     setShowChat={setShowChat}
//     setOpenSideBar={setOpenSideBar}
//     setSwitchSideBar={setSwitchSideBar}
//     openSideBar={openSideBar}
//   />
// ) : (
//   <Sidebar
//     switchIcon="switchicon"
//     setSwitchSideBar={setSwitchSideBar}
//     switchSideBar={switchSideBar}
//     setOpenSideBar={setOpenSideBar}
//     openSideBar={openSideBar}
//   />
// );
