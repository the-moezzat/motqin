import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../Auth/auth.css";
import logo from "../../../assets/Images/logo.svg";
import google from "../../../assets/Images/google.png";

import { Link } from "react-router-dom";
import { SiFacebook } from "react-icons/si";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [errorSignIn, setErrorSignIn] = useState("");
  const emailFromLocal = localStorage.getItem("email");
  const passwordFromLocal = localStorage.getItem("password");
  const token = localStorage.getItem("token");
  const [checkBoxValue, setCHeckBoxValue] = useState(false);
  console.log("emailFromLocal", emailFromLocal);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("الأيميل غير صالح").required("ادخل الايميل"),
      password: Yup.string().required("ادخل الباسورد"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://srv475086.hstgr.cloud/api/user/login/`,
          values
        );

        // Assuming the response contains user data
        const userData = response.data;
        const tokenKey = userData.tokens.access;

        // Save token to localStorage
        if (checkBoxValue) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }

        localStorage.setItem("token", tokenKey);

        navigate("/myaccount");
        window.location.reload();
      } catch (error) {
        // Handle error

        setErrorSignIn("يوجد خطأ بالايميل او الباسورد");
      }
    },
  });

  return (
    <section
      className="d-flex justify-content-center align-items-center ar bg-white "
      dir="rtl">
      <div className="d-flex flex-column justify-content-center  align-items-center  col-xl-4 col-lg-6 col-12 h_vh_IN">
        <LazyLoadImage
          alt={"hi"}
          effect="blur"
          src={logo}
          className="h-100 img_xxl"
          opacity="true"
          placeholderSrc={logo}
        />
        <form
          className="mt-5 d-flex flex-column gap-1 align-content-end w-100 px-5  gap-2"
          onSubmit={formik.handleSubmit}>
          <label
            htmlFor="email"
            className=" fs_auth fw-bold  text-move">
            بريدك الألكتروني{" "}
          </label>
          <input
            id="email"
            type="text"
            className="input_style_auth"
            placeholder="البريد الإلكتروني"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
          <label
            htmlFor="password"
            className="fs_auth fw-bold  text-move">
            كلمة المرور
          </label>
          <span className=" span_input">
            <input
              id="password"
              type="password"
              className="input_style_auth"
              placeholder="كلمة المرور"
              {...formik.getFieldProps("password")}
            />
          </span>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-danger">{formik.errors.password}</div>
          ) : null}
          <div className="form-check fw-bold  text-move">
            <input
              className="form-check-input"
              type="checkbox"
              value={checkBoxValue}
              onChange={() => setCHeckBoxValue(!checkBoxValue)}
              id="flexCheckDefault"
            />
            <label
              className="form-check-label fs_auth"
              htmlFor="flexCheckDefault">
              تذكرني
            </label>
          </div>
          <div className=" text-center text-danger">{errorSignIn}</div>
          <button
            type="submit"
            className="button_auth fs_auth"
            style={{ background: "#ed5ab3", border: "1px" }}>
            تسجيل دخول
          </button>
        </form>
        <p className=" fw-normal my-2  text-muted ">أو الدخول بواسطة</p>

        <div className="d-flex flex-column gap-3 align-content-end w-100 px-5  gap-2">
          <button className="button_auth fs_auth">
            دخول بواسطة جوجل
            <LazyLoadImage
              alt={"hi"}
              effect="blur"
              src={google}
              className="h-100"
              opacity="true"
              placeholderSrc={google}
            />
          </button>

          <button className="button_auth fs_auth">
            دخول بواسطة فيس بوك
            <SiFacebook className=" white fs-5" />
          </button>
        </div>
        <Link
          to="/forgotpassword"
          className="mt-4 fs-6 text-black-50 ">
          فقدت كلمة المرور الخاصة بك؟
        </Link>

        <span className="mt-4 d-flex gap-2">
          <p className=" fs-6 text-black-50">ليس لديك حساب؟</p>
          <Link
            to="/signup"
            className="fs-6 fw-bolder  text-move    ">
            إنشاء حساب
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
