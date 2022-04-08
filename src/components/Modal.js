import React, { useEffect } from "react";

const Modal = (props) => {
  const { setPopUp, data, handleSubmit, isDelete } = props;
  const [url, setUrl] = React.useState("");

  useEffect(() => {
    setUrl(data.url);
  }, [data]);
  const handleChange = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div className="PopUp">
      <button className="popup-x" onClick={() => setPopUp(false)}>
        X
      </button>

      {!isDelete ? (
        <div className="pu-content-container">
          <div className="pu-content-container__form">
            <h2>Edit</h2>
            <div className="pu-content-container">
              <input
                type="text"
                placeholder="Update your url here"
                className="urlForm__container__input"
                value={url}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pu-content-container">
          <div className="pu-content-container__title">
            Are you sure you want to delete this url?
          </div>
        </div>
      )}
      {/* button controls */}
      <div className="pu-button-container">
        <button
          className="createButton"
          onClick={() => {
            handleSubmit({
              ...data,
              url: url,
            });
            setPopUp(false);
          }}
        >
          {!isDelete ? "Save" : "Delete"}
        </button>
        <button className="clearButton" onClick={() => setPopUp(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
