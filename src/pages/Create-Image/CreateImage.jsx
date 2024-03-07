import React, { useEffect, useState } from "react";
import "./CreateImage.css";
import magic_hat from "../../assets/Images/create-image/magic-hat.png";
import ImageHeader from "../../components/Create-Image/ImageHeader";
import rocket from "../../assets/Images/create-image/fluent_rocket-24-filled.png";
import gettingImage from "../../assets/Images/create-image/Frame 1171276895.png";
import { saveAs } from "file-saver";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { TbScanEye } from "react-icons/tb";
import { FaTrash } from "react-icons/fa6";
import { PiDownloadSimpleBold } from "react-icons/pi";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, postData } from "../../redux/slices/apiSlice";

const CreateImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (imagePath) => {
    setSelectedImage(`https://srv475086.hstgr.cloud${imagePath}`);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const { post } = useSelector((state) => state.api);
  const { loading: postLoading, error: postError } = post;
  // const { delete } = useSelector((state) => state.api);
  // const { loading: deleteLoading, error: deletepostError } = delete;

  const [imagesList, setImagesList] = useState();
  console.log(postError);

  useEffect(() => {
    async function fetching() {
      const userImageFetched = await dispatch(
        fetchData({ endpoint: "v1/image-generator/images/" })
      );
      setImagesList(userImageFetched?.payload);
    }
    fetching();
  }, []);

  const validationSchema = Yup.object({
    image: Yup.string().required("This field is required"),
  });

  const initialValues = {
    image: "",
  };

  console.log("imagesList مع الصورة الجديدة", imagesList);
  //Generate Image
  const onSubmit = async (values) => {
    try {
      const newImage = await dispatch(
        postData({ endpoint: "v1/image-generator/create/", data: values.image })
      );
      console.log("newImage", newImage?.payload);

      setImagesList([...imagesList, newImage?.payload]);
      console.log("imagesList مع الصورة الجديدة", imagesList);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  //DownLoad Image
  const handleDownLoadImage = async (image_path) => {
    try {
      const imageUrl = `https://srv475086.hstgr.cloud${image_path}`;

      saveAs(imageUrl, "downloaded_image.png");
    } catch (error) {
      console.error("Error downloading image:", error.message);
    }
  };
  const handleDeleteImage = async (id) => {
    try {
      console.log("id from function", id);
      await dispatch(
        deleteData({
          endpoint: `v1/image-generator/images/${id}/remove/`,
        })
      );
      const newListAfterDelete = imagesList.filter((image) => image.id !== id);

      setImagesList([...newListAfterDelete]);
    } catch (error) {
      console.error("Error Deleting Image:", error);
    }
  };
  console.log("imagesList مع الصورة الجديدة", imagesList);

  return (
    <div
      dir="rtl"
      className="pt-5">
      <ImageHeader />

      <div>
        <div className="images-container">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form className="formik-container d-flex flex-column flex-sm-row">
                <Field
                  disabled={loading || postLoading}
                  className="formik-field px-4"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="حول افكارك الى تصاميم ابداعية"
                />
                <button
                  disabled={loading || postLoading}
                  className="formin-button "
                  type="submit">
                  <div>
                    <img
                      style={{ maxWidth: "25px", maxHeight: "25px" }}
                      src={rocket}
                    />
                  </div>
                  <div>إنشاء</div>
                </button>
              </Form>
            </Formik>
          </div>
          {postLoading && (
            <div className=" mt-4">
              <div className="text-center">
                <div
                  className="spinner-border"
                  role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}
          {postError && (
            <div className=" d-flex justify-content-center mt-4">
              <button className=" text-white fw-bold  btn bg-danger">
                حدث خطأ اثناء التصميم
              </button>
            </div>
          )}
          {loading ? (
            <div className="container-spinner">
              <div className="text-center">
                <div
                  className="spinner-border"
                  role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mt-5 mx-1">
              {imagesList?.map((image, index) => (
                <div
                  key={index}
                  className="main-container   col-6 col-md-4 py-2 col-lg-3">
                  <div className="image-container position-relative">
                    <img
                      className="images"
                      src={`https://srv475086.hstgr.cloud${image?.image_paths}`}
                    />

                    <div className="image-buttons ">
                      {/* Buttons */}

                      <div className="bg-blur-image" />
                      <button
                        onClick={() => handleDeleteImage(image?.id)}
                        style={{ fontSize: "20px" }}
                        className="button-image ">
                        <FaTrash
                          style={{ fontSize: "25px" }}
                          className="  fw-bold"
                        />
                      </button>

                      <button
                        onClick={() => handleShow(image?.image_paths)}
                        className=" button-image">
                        <TbScanEye style={{ fontSize: "30px" }} />
                      </button>

                      <button
                        onClick={() => handleDownLoadImage(image?.image_paths)}
                        className="button-image ">
                        <PiDownloadSimpleBold style={{ fontSize: "30px" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Modal View Image */}
      <Modal
        show={showModal}
        onHide={handleClose}>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}>
            أغلق
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal View Image */}
    </div>
  );
};

export default CreateImage;
