import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../Util/ChatSideBar.css";
import { IoClose } from "react-icons/io5";
import { BiPlusMedical } from "react-icons/bi";
import { TfiSearch } from "react-icons/tfi";

import "../components/ChatRoutes/ChatRoutes.css";
import switcherIcon from "../assets/Images/sideBar/toggleSidebar.png";
import chatIconPages from "../assets/Images/sideBar/chatIconPage.png";
import "../pages/ChatRoutes/StartChatPage.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAllChats } from "../actions/chat";

const ChatSideBar = ({
  switchIcon,
  setShowChat,
  openSideBar,
  setOpenSideBar,
}) => {
  const [chats, setChats] = React.useState([]);
  const [staticData, setStaticData] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllChats();
      setChats(res);
      setStaticData(res);
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object({
    search: Yup.string(),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    resetForm();
  };
  const searchFunction = (searchTerm) => {
    const filteredChats = staticData.filter((chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setChats(filteredChats);
  };

  function navigateToChat(id) {
    navigate(`/ChatRoutes${id}`);
    setShowChat(id);
  }

  return (
    <div dir="rtl" className="allsidebar">
      <div className=" toggleIcon">
        {switchIcon && (
          <IoClose
            onClick={() => setOpenSideBar(!openSideBar)}
            className=" openSideIcon"
          />
        )}
      </div>
      <div className="fixed">
        <div className="add-chat" onClick={() => navigateToChat("")}>
          <span
            style={{
              color: "#001B79",
              fontWeight: "300",
              textAlign: "center",
              flex: "1",
            }}
          >
            محادثة جديدة
          </span>
          <span style={{ fontWeight: "800" }}>
            <BiPlusMedical />
          </span>
        </div>

        <div className="search-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange }) => (
              <Form className="">
                <Field
                  className=" w-100"
                  type="text"
                  id="search"
                  name="search"
                  placeholder="بحث"
                  value={values.search}
                  onChange={(e) => {
                    handleChange(e); // Update Formik state
                    searchFunction(e.target.value); // Trigger search function
                  }}
                />
                <ErrorMessage name="search" component="div" />
              </Form>
            )}
          </Formik>
          <TfiSearch
            style={{
              color: "#001A78",
            }}
            className="search-icon"
            alt="search"
          />
        </div>
        {openSideBar && <p className="head-of-chats">اخر محادثات</p>}
      </div>

      <div className="chats">
        {chats?.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigateToChat("/" + chat.id)}
            className="chat"
          >
            <img src={chatIconPages} alt="chat" style={{ width: "15px" }} />
            <div className=" buttonChatText">{chat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
