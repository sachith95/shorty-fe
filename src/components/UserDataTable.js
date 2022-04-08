import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";

const BASEURL = "http://127.0.0.1:8000/api";

const UserDataTable = (props) => {
  const [userdata, setUserdata] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  useEffect(() => {
    const token = JSON.parse(global.auth.getToken()).access_token;
    if (token) {
      axios
        .get(`${BASEURL}/me/urls`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setPage(res.data.current_page);
          setNextPage(res.data.next_page_url);
          setPrevPage(res.data.prev_page_url);
          setUserdata(res.data.data);
        });
    }
  }, [props.isLoading]);

  const nextPageHandler = () => {
    if (nextPage) {
      axios
        .get(nextPage, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(global.auth.getToken()).access_token
            }`,
          },
        })
        .then((res) => {
          console.log(res);
          setPage(res.data.current_page);
          setNextPage(res.data.next_page_url);
          setPrevPage(res.data.prev_page_url);
          setUserdata(res.data.data);
        });
    }
  };

  const prevPageHandler = () => {
    if (prevPage) {
      axios
        .get(prevPage, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(global.auth.getToken()).access_token
            }`,
          },
        })
        .then((res) => {
          console.log(res);
          setPage(res.data.current_page);
          setNextPage(res.data.next_page_url);
          setPrevPage(res.data.prev_page_url);
          setUserdata(res.data.data);
        });
    }
  };

  const handleEdit = (val) => {
    props.setIsLoading(true);
    const token = JSON.parse(global.auth.getToken()).access_token;
    axios
      .put(`${BASEURL}/url/${val.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: val.url,
      })
      .then((res) => {
        console.log(res);
      })
      .finally(props.setIsLoading(false));
  };

  const handleDelete = (val) => {
    const token = JSON.parse(global.auth.getToken()).access_token;
    props.setIsLoading(true);
    axios
      .delete(`${BASEURL}/url/${val.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .finally(props.setIsLoading(false));
  };

  const handleRedirect = (short_url) => {
    window.open(BASEURL + "/" + short_url, "_blank");
    setTimeout(() => {
      props.setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="dataTable d-flex justify-content-center">
      {userdata ? (
        <div className="dataTable__container">
          <table>
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Views</th>
                <th>Created at</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((i, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <a onClick={() => handleRedirect(i.short_url)}>
                        {i.short_url}
                      </a>
                    </td>
                    <td>{i.url}</td>
                    <td>{i.redirect_count}</td>
                    <td>{new Date(i.created_at).toISOString().slice(0, 10)}</td>
                    <td>
                      <button
                        className="editButton"
                        type="button"
                        onClick={() => {
                          setOpenEditModal(true);
                          setSelectedData(i);
                        }}
                      >
                        {" "}
                        Edit{" "}
                      </button>
                      <button
                        className="deleteButton"
                        type="button"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedData(i);
                        }}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="tableFooter">
            {nextPage ? (
              <button
                className="tableFooter__button"
                onClick={() => {
                  setPage(page + 1);
                  nextPageHandler();
                }}
              >
                Next
              </button>
            ) : null}
            {prevPage ? (
              <button
                className="tableFooter__button"
                onClick={() => {
                  setPage(page - 1);
                  prevPageHandler();
                }}
              >
                Prev
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
      {openEditModal ? (
        <Modal
          setPopUp={setOpenEditModal}
          data={selectedData}
          handleSubmit={(val) => handleEdit(val)}
          isDelete={false}
        />
      ) : null}
      {openDeleteModal ? (
        <Modal
          setPopUp={setOpenDeleteModal}
          data={selectedData}
          handleSubmit={(val) => handleDelete(val)}
          isDelete={true}
        />
      ) : null}
    </div>
  );
};

export default UserDataTable;
