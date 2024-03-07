import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MdKeyboardArrowLeft } from "react-icons/md";
import logoutIcon from "../assets/Images/navBar/logoutNav.png";
import myaccout from "../assets/Images/navBar/myAccount.png";
import resfresh from "../assets/Images/navBar/shape.png";
import { useNavigate } from "react-router-dom";
import { TbPointFilled } from "react-icons/tb";
import { PiGear } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";

import React, { useState } from "react";
import "./Navbar.css";

import logo from "../assets/logo.svg";
import avatr from "../assets/Images/navBar/Avatar.png";

const Navbar = () => {
  const [showOptaions, setShowOptaions] = useState(false);
  const [renewalDate, setRenewalDate] = useState("2024-01-01");
  const [navDroplist, setNavDroplist] = useState(false);
  const [wordsCount, setWordsCount] = useState(850);
  const [wordsUsed, setWordsUsed] = useState(300);
  const widthProgress = (wordsUsed / wordsCount) * 100;
  const handelUpgrade = () => {};
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any additional logout logic here if needed

    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Navigate to the login page or any other desired page
    navigate("/signin");
  };

  return (
    <div className="navbar  ">
      <div className="d-flex align-items-center gap-3">
        <div className="user-details ms-3">
          <div
            className="user-btn"
            onClick={() => setNavDroplist((prev) => !prev)}>
            <img
              src={avatr}
              alt="user img"
            />
          </div>
          {navDroplist && (
            <div
              dir="rtl"
              className=" position-absolute  user-list">
              <div>
                <div className=" user-name-avatar gap-2">
                  <img
                    src={avatr}
                    className=" avatar-droplist"
                  />
                  <div className=" text-center">
                    <div className=" hello-text">مرحبا</div>
                    <div className=" avatar-name">مصطفي </div>
                  </div>
                </div>
                <div className=" d-flex gap-2 pt-3 flex-column">
                  <div className=" d-flex gap-2 count-text">
                    عدد الكلمات :
                    <div className="count-mainsub-text  d-flex">
                      <span className="count-subtext"> 150 </span> الف
                    </div>
                  </div>
                  <div className="d-flex gap-2  count-text">
                    التجديد :{" "}
                    <span
                      className="count-subtext "
                      dir="rtl">
                      2024-01-01
                    </span>
                  </div>
                  <button className=" button-user-list d-flex  align-items-center  gap-1">
                    <img
                      src={myaccout}
                      alt="myaccout"
                      className="  droplist-sub-icon"
                    />
                    <div className="droplist-subtext">حسابي</div>
                  </button>
                  <button className=" button-user-list align-items-center d-flex gap-1 ">
                    <img
                      src={resfresh}
                      alt="myaccout"
                      className="  droplist-sub-icon"
                    />
                    <div className="droplist-subtext">إدارة الاشتراك</div>
                  </button>
                </div>
                <div className="" />
                <div className="user-navnumbers d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: "10px", fontWeight: "700" }}>
                    {wordsUsed}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "700" }}>
                    {wordsCount}
                  </div>
                </div>
                <div className=" progress-navbar">
                  <div
                    style={{ width: widthProgress }}
                    className=" user-navprogress"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    outline: "none",
                  }}
                  className=" d-flex  pt-3  align-items-center gap-2">
                  <img
                    src={logoutIcon}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                    alt="logOut"
                  />
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#ed5ab3",
                      fontWeight: "600",
                    }}>
                    تسجيل الخروج
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className="upgrade"
        >
          تصدير
        </div>
        <div
        className="text-basic ms-3"
         >
         <TbPointFilled className="text-basic"/>
    <span>الاستخدام</span>
      </div>

      <div
        className="text-basic ms-3"
         >
        
    <span className="font-number">1/50000</span>
      </div>
      </div>
  
      <div className="logo d-flex me-3 align-items-center  justify-content-center">
   <MdKeyboardArrowLeft size={30} color="rgba(82, 37, 206)"/>
        <img
          src={logo}
          alt="motqen logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
